import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Session } from '../session/entities/session.entity';
import { Pose } from '../poses/entities/pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchedSession, Session, User, Pose])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
