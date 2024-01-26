import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';
import { Repository } from 'typeorm';
import { Session } from '../session/entities/session.entity';
import { Pose } from '../poses/entities/pose.entity';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionCustomService {
  constructor(
    @InjectRepository(Session)
    private sessionCustomRepository: Repository<Session>,
    @InjectRepository(Pose)
    private poseRepository: Repository<Pose>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getSessionCustoms(userId: number): Promise<Session[]> {
    return this.sessionCustomRepository.find({
      where: { isCustom: true, user: { id: userId } },
    });
  }

  async getSessionCustom(id: number, userId: number): Promise<Session> {
    const sessionCustom = await this.sessionCustomRepository.findOne({
      where: { isCustom: true, id: id, user: { id: userId } },
    });
    if (!sessionCustom) {
      throw new NotFoundException('Session Custom not found');
    }
    return sessionCustom;
  }

  async createSessionCustom(
    createSessionCustomDto: CreateSessionCustomDto,
    userId: number,
  ): Promise<Session> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const sessionCustom = this.sessionCustomRepository.create({
      ...createSessionCustomDto,
      user: user,
      duration: Number(createSessionCustomDto.duration),
      isCustom: true,
    });
    return this.sessionCustomRepository.save(sessionCustom);
  }

  async updateSessionCustom(
    id: number,
    updateSessionCustomDto: UpdateSessionCustomDto,
    userId: number,
  ): Promise<Session> {
    const sessionCustom = await this.getSessionCustom(id, userId);

    const { duration, ...rest } = updateSessionCustomDto;
    const updatedSessionCustom = {
      ...sessionCustom,
      ...rest,
      duration: duration ? Number(duration) : sessionCustom.duration,
      poses: undefined,
      isCustom: true,
    };

    await this.sessionCustomRepository.update(
      { id: id, user: { id: userId } },
      updatedSessionCustom,
    );

    return this.getSessionCustom(id, userId);
  }

  async removeSessionCustom(id: number, userId: number): Promise<Session> {
    const sessionCustom = await this.getSessionCustom(id, userId);
    await this.sessionCustomRepository.delete({ id: sessionCustom.id });
    return sessionCustom;
  }

  async addPoseToSessionCustom(
    sessionCustomId: number,
    poseId: number,
    userId: number,
  ) {
    const sessionCustom = await this.getSessionCustom(sessionCustomId, userId);

    const pose = await this.poseRepository.findOne({
      where: { id: poseId },
    });
    if (!pose) {
      throw new NotFoundException('Pose not found');
    }

    if (!sessionCustom.poses) {
      sessionCustom.poses = [];
    }

    if (sessionCustom.poses.find((pose) => pose.id === poseId)) {
      throw new BadRequestException('Pose already added to SessionCustom');
    }
    sessionCustom.poses.push(pose);

    await this.sessionCustomRepository.query(
      'INSERT INTO sessionCustom_pose (poseId, sessionCustomId) VALUES (?,?)',
      [poseId, sessionCustomId],
    );

    return sessionCustom;
  }

  async removePoseFromSessionCustom(
    sessionCustomId: number,
    poseId: number,
    userId: number,
  ) {
    const sessionCustom = await this.getSessionCustom(sessionCustomId, userId);

    const pose = await this.poseRepository.findOne({
      where: { id: poseId },
    });
    if (!pose) {
      throw new NotFoundException('POSE not found');
    }

    // Vérifie si la Pose est dans la SessionCustom
    const poseInSession = sessionCustom.poses.find((p) => p.id === poseId);
    if (!poseInSession) {
      throw new BadRequestException('Pose not found in SessionCustom');
    }

    // Retire la Pose de la SessionCustom
    sessionCustom.poses = sessionCustom.poses.filter((p) => p.id !== poseId);

    await this.sessionCustomRepository.query(
      'DELETE FROM `sessionCustom_pose` WHERE `poseId` = ? AND `sessionCustomId` = ?',
      [poseId, sessionCustomId],
    );

    return sessionCustom;
  }
}
