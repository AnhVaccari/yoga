import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchedSession, Session, User])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
