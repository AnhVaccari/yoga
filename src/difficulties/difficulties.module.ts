import { Module } from '@nestjs/common';
import { DifficultiesController } from './difficulties.controller';
import { DifficultiesService } from './difficulties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty])],
  controllers: [DifficultiesController],
  providers: [DifficultiesService],
})
export class DifficultiesModule {}
