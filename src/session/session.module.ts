import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';
import { Pose } from '../poses/entities/pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchedSession, Session, User, Pose])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
