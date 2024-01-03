import { Module } from '@nestjs/common';
import { difficultyProviders } from './difficulty.providers';
import { DifficultyService } from './difficulty.service';
import { DifficultyController } from './difficulty.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DifficultyController],
  providers: [...difficultyProviders, DifficultyService],
})
export class DifficultyModule {}
