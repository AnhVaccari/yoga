import { Module } from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { SessionCustomController } from './session_custom.controller';
import { DatabaseModule } from '../database/database.module';
import { sessionCustomProviders } from './session_custom.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionCustomController],
  providers: [...sessionCustomProviders, SessionCustomService],
})
export class SessionCustomModule {}
