import { Module } from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { SessionCustomController } from './session_custom.controller';

@Module({
  controllers: [SessionCustomController],
  providers: [SessionCustomService],
})
export class SessionCustomModule {}
