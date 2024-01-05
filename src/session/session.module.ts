import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { sessionProviders } from './session.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [...sessionProviders, SessionService],
})
export class SessionModule {}
