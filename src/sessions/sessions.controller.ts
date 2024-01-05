import { SessionsService } from './sessions.service';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Sessions } from './entities/sessions.entity';

@ApiBearerAuth()
@ApiTags('yoga')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({
    status: 200,
    description: 'List of sessions',
    type: [Sessions],
  })
  async getAllSessions() {
    return this.sessionsService.getSessions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session' })
  @ApiResponse({
    status: 200,
    description: 'One session',
    type: [Sessions],
  })
  async getOneSession(@Param('id') id: string) {
    return this.sessionsService.getSession(+id);
  }
}
