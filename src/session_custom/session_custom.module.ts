import { Module } from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { SessionCustomController } from './session_custom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionCustom } from './entities/session_custom.entity';
import { Pose } from '../poses/entities/pose.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionCustom, Pose, User])],
  controllers: [SessionCustomController],
  providers: [SessionCustomService],
})
export class SessionCustomModule {}
