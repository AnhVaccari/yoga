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
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SessionCustomService {
  constructor(
    @Inject('SESSION_CUSTOM_REPOSITORY')
    private sessionCustomRepository: Repository<SessionCustom>,
    @Inject('POSES_REPOSITORY')
    private poseRepository: Repository<Pose>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getSessionCustoms(userId: number): Promise<SessionCustom[]> {
    return this.sessionCustomRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getSessionCustom(id: number, userId: number): Promise<SessionCustom> {
    const sessionCustom = await this.sessionCustomRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!sessionCustom) {
      throw new NotFoundException('Session Custom not found');
    }
    return sessionCustom;
  }

  async createSessionCustom(
    createSessionCustomDto: CreateSessionCustomDto,
    userId: number,
  ): Promise<SessionCustom> {
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
    });
    return this.sessionCustomRepository.save(sessionCustom);
  }

  async updateSessionCustom(
    id: number,
    updateSessionCustomDto: UpdateSessionCustomDto,
    userId: number,
  ): Promise<SessionCustom> {
    const sessionCustom = await this.getSessionCustom(id, userId);

    const { duration, ...rest } = updateSessionCustomDto;
    const updatedSessionCustom = {
      ...sessionCustom,
      ...rest,
      duration: duration ? Number(duration) : sessionCustom.duration,
      poses: undefined,
    };

    await this.sessionCustomRepository.update(
      { id: id, user: { id: userId } },
      updatedSessionCustom,
    );

    return this.getSessionCustom(id, userId);
  }

  async removeSessionCustom(
    id: number,
    userId: number,
  ): Promise<SessionCustom> {
    await this.getSessionCustom(id, userId);
    await this.sessionCustomRepository.softDelete({ id: id });
    return this.getSessionCustom(id, userId);
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
    console.log('Pose:', pose);
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
      throw new NotFoundException('Pose not found');
    }

    // Vérifie si la Pose est dans la SessionCustom
    const poseInSession = sessionCustom.poses.find(
      (pose) => pose.id === poseId,
    );
    if (!poseInSession) {
      throw new BadRequestException('Pose not found in SessionCustom');
    }

    // Retire la Pose de la SessionCustom
    sessionCustom.poses = sessionCustom.poses.filter(
      (pose) => pose.id !== poseId,
    );

    await this.sessionCustomRepository.query(
      'DELETE FROM `sessionCustom_pose` WHERE `poseId` = ? AND `sessionCustomId` = ?',
      [poseId, sessionCustomId],
    );

    return sessionCustom;
  }
}
