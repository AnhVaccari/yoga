import { Module } from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { SessionCustomController } from './session_custom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Session } from '../session/entities/session.entity';
import { Pose } from '../poses/entities/pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchedSession, Session, User, Pose])],
  controllers: [SessionCustomController],
  providers: [SessionCustomService],
})
export class SessionCustomModule {}
