import { Injectable, Inject } from '@nestjs/common';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';
import { Repository } from 'typeorm';
import { SessionCustom } from './entities/session_custom.entity';

@Injectable()
export class SessionCustomService {
  constructor(
    @Inject('SESSION_CUSTOM_REPOSITORY')
    private sessionCustomRepository: Repository<SessionCustom>,
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
}
