import { Module } from '@nestjs/common';
import { difficultiesProviders } from './difficulties.providers';
import { DatabaseModule } from 'src/database/database.module';
import { DifficultiesController } from './difficulties.controller';
import { DifficultiesService } from './difficulties.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DifficultiesController],
  providers: [...difficultiesProviders, DifficultiesService],
})
export class DifficultiesModule {}
