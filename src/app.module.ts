import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultyModule } from './controller/difficulty/difficulty.module';

@Module({
  imports: [DifficultyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
