import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { User } from '../user/entities/user.entity';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LaunchedSession)
    private launchedSessionRepository: Repository<LaunchedSession>,
  ) {}
  async getSessions(userId: number): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { id: userId },
    });
  }
  async getSession(id: number, userId: number): Promise<Session> {
    return this.sessionRepository.findOne({
      where: { id: userId },
    });
  }

  async startSession(sessionId: number, userId: number): Promise<Session> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Session introuvable');
    }

    const ongoingSession = await this.launchedSessionRepository.findOne({
      where: {
        end_date: IsNull(),
        user: { id: userId },
      },
    });

    if (ongoingSession) {
      throw new BadRequestException('Une session est déjà en cours');
    }

    await this.launchedSessionRepository.save({
      session: session,
      user: user,
      start_date: new Date(),
    });

    // Effectuer une requête SELECT pour obtenir la version mise à jour de la session
    const updatedSession = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!updatedSession) {
      // Gérer le cas où la session n'a pas été mise à jour avec succès
      throw new Error("La session n'a pas été mise à jour correctement");
    }

    return updatedSession;
  }

  async stopSession(sessionId: number, userId: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Session introuvable');
    }

    const ongoingSession = await this.launchedSessionRepository.findOne({
      where: {
        end_date: IsNull(),
        user: { id: userId },
      },
    });

    if (!ongoingSession) {
      throw new BadRequestException("Aucune session n'est en cours");
    }
    ongoingSession.end_date = new Date();

    await this.launchedSessionRepository.save(ongoingSession);

    // Effectuer une requête SELECT pour obtenir la version mise à jour de la session
    const updatedSession = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!updatedSession) {
      // Gérer le cas où la session n'a pas été mise à jour avec succès
      throw new Error("La session n'a pas été mise à jour correctement");
    }

    return updatedSession;
  }
}
