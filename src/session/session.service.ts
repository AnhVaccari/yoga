import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
@Injectable()
export class SessionService {
  constructor(
    @Inject('SESSIONS_REPOSITORY')
    private sessionRepository: Repository<Session>,
  ) {}
  async getSessions(): Promise<Session[]> {
    return this.sessionRepository.find();
  }
  async getSession(id: number): Promise<Session> {
    return this.sessionRepository.findOne({ where: { id: id } });
  }

  async startSession(sessionId: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });
    session;
    return this.sessionRepository.save(session);
  }
}
