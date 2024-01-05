import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { sessionsProviders } from './sessions.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionsController],
  providers: [...sessionsProviders, SessionsService],
})
export class SessionsModule {}
