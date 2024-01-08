import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';
import { Repository } from 'typeorm';
import { SessionCustom } from './entities/session_custom.entity';
import { Pose } from 'src/poses/entities/pose.entity';

@Injectable()
export class SessionCustomService {
  constructor(
    @Inject('SESSION_CUSTOM_REPOSITORY')
    private sessionCustomRepository: Repository<SessionCustom>,
    @Inject('POSE_REPOSITORY')
    private poseRepository: Repository<Pose>,
  ) {}

  async getSessionCustoms(): Promise<SessionCustom[]> {
    return this.sessionCustomRepository.find();
  }

  async getSessionCustom(id: number): Promise<SessionCustom> {
    return this.sessionCustomRepository.findOne({
      where: { id: id },
    });
  }

  async createSessionCustom(
    createSessionCustomDto: CreateSessionCustomDto,
  ): Promise<SessionCustom> {
    const sessionCustom = this.sessionCustomRepository.create({
      ...createSessionCustomDto,
      duration: Number(createSessionCustomDto.duration),
    });
    return this.sessionCustomRepository.save(sessionCustom);
  }

  async updateSessionCustom(
    id: number,
    updateSessionCustomDto: UpdateSessionCustomDto,
  ): Promise<SessionCustom> {
    const { duration, ...rest } = updateSessionCustomDto;
    const updatedSessionCustom = {
      ...rest,
      duration: Number(duration),
    };

    await this.sessionCustomRepository.update({ id: id }, updatedSessionCustom);

    return this.sessionCustomRepository.findOne({
      where: { id: id },
    });
  }

  async removeSessionCustom(id: number): Promise<SessionCustom> {
    await this.sessionCustomRepository.softDelete({ id: id });
    return this.sessionCustomRepository.findOne({
      where: { id: id },
    });
  }

  async addPoseToSessionCustom(sessionCustomId: number, poseId: number) {
    const sessionCustom = await this.sessionCustomRepository.findOne({
      where: { id: sessionCustomId },
    });
    if (!sessionCustom) {
      throw new NotFoundException('SessionCustom not found');
    }
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
      'INSERT INTO `sessionCustom_pose`(`poseId`, `sessionCustomId`) VALUES (?,?)',
      [poseId, sessionCustomId],
    );

    return sessionCustom;
  }
}
