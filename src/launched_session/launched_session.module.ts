import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchedSession } from './entities/launched_session.entity';
import { User } from '../user/entities/user.entity';
import { Session } from '../session/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaunchedSession, User, Session])],
  controllers: [],
  providers: [],
})
export class LaunchedSessionModule {}
