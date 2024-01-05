import { SessionService } from './session.service';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Session } from './entities/session.entity';

@ApiBearerAuth()
@ApiTags('yoga')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({
    status: 200,
    description: 'List of sessions',
    type: [Session],
  })
  async getAllSessions() {
    return this.sessionService.getSessions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session' })
  @ApiResponse({
    status: 200,
    description: 'One session',
    type: [Session],
  })
  async getOneSession(@Param('id') id: string) {
    return this.sessionService.getSession(+id);
  }
}
