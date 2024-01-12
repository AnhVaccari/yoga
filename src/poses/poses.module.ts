import { Module } from '@nestjs/common';
import { PosesService } from './poses.service';
import { PosesController } from './poses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pose } from './entities/pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pose])],
  controllers: [PosesController],
  providers: [PosesService],
})
export class PosesModule {}
