import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Pose } from '../poses/entities/pose.entity';
import { Session } from '../session/entities/session.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LaunchedSession)
    private launchedSessionRepository: Repository<LaunchedSession>,
    @InjectRepository(Pose)
    private poseRepository: Repository<Pose>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      select: ['id', 'username', 'email', 'date_joined'],
      where: { id: id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 20;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id: id }, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUser(id: number): Promise<User> {
    await this.userRepository.softDelete({ id: id });
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async isSessionActive(userId: number) {
    const ongoingSession = await this.launchedSessionRepository.findOne({
      where: {
        user: { id: userId },
        end_date: IsNull(),
      },
    });

    if (!ongoingSession) {
      throw new NotFoundException('No active session');
    }

    return ongoingSession;
  }

  async getTotalSessionCount(userId: number): Promise<number> {
    return this.launchedSessionRepository.count({
      where: { user: { id: userId } },
    });
  }

  async getAverageDailySessionDuration(userId: number): Promise<number> {
    const minSessionDurationInMinutes = 5; // Sessions de moins de 5 minutes sont exclues
    const maxSessionDurationInMinutes = 120; // Sessions de plus de 2 heures sont exclues

    const rawDurations = await this.launchedSessionRepository
      .createQueryBuilder('launchedSession')
      .select('DATE(launchedSession.start_date)', 'sessionDate')
      .addSelect(
        'SUM(CASE ' +
          'WHEN TIMESTAMPDIFF(MINUTE, launchedSession.start_date, launchedSession.end_date) BETWEEN :minDuration AND :maxDuration THEN TIMESTAMPDIFF(MINUTE, launchedSession.start_date, launchedSession.end_date) ' +
          'ELSE 0 END)',
        'totalDailyDuration',
      )
      .setParameter('minDuration', minSessionDurationInMinutes)
      .setParameter('maxDuration', maxSessionDurationInMinutes)
      .where('launchedSession.userId = :userId', { userId })
      .groupBy('sessionDate')
      .getRawMany();

    const totalDuration = rawDurations.reduce((acc, session) => {
      acc += parseInt(session.totalDailyDuration);
      return acc;
    }, 0);

    const averageDuration =
      rawDurations.length > 0 ? totalDuration / rawDurations.length : 0;

    return Math.round(averageDuration);
  }

  async getMostPracticedPoses(userId: number, topN: number): Promise<any[]> {
    const qb =
      this.launchedSessionRepository.createQueryBuilder('launchedSession');

    // Joindre la table Session
    qb.innerJoin('launchedSession.session', 'session')
      .leftJoin('session.poses', 'pose') // Supposant que Session a une relation 'poses'
      .leftJoin('launchedSession.user', 'user')
      .where('user.id = :userId', { userId })
      .select('pose.id', 'id')
      .addSelect('pose.sanskrit_name', 'sanskrit_name')
      .addSelect('pose.english_name', 'english_name')
      .addSelect('pose.img_url_svg', 'img_url_svg')
      .addSelect('pose.img_url_svg_alt', 'img_url_svg_alt')
      .addSelect('pose.img_url_jpg', 'img_url_jpg')
      .addSelect('COUNT(pose.id)', 'poseCount')
      .groupBy('pose.id')
      .orderBy('poseCount', 'DESC')
      .limit(topN);

    return qb.getRawMany();
  }
}
