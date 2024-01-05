import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sessions } from './entities/sessions.entity';
@Injectable()
export class SessionsService {
  constructor(
    @Inject('SESSIONS_REPOSITORY')
    private sessionsRepository: Repository<Sessions>,
  ) {}
  async getSessions(): Promise<Sessions[]> {
    return this.sessionsRepository.find();
  }
  async getSession(id: number): Promise<Sessions> {
    return this.sessionsRepository.findOne({ where: { session_id: id } });
  }
}
