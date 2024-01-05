import { Module } from '@nestjs/common';
import { PosesService } from './poses.service';
import { PosesController } from './poses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { posesProviders } from './poses.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PosesController],
  providers: [...posesProviders, PosesService],
})
export class PosesModule {}
