import { SessionService } from './session.service';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Session } from './entities/session.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from 'src/decorators/user-authenticated.decorator';

@ApiBearerAuth()
@ApiTags('yoga')
@UseGuards(JwtAuthGuard)
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

  @Post(':sessionId/start')
  @ApiOperation({ summary: 'Start a session' })
  @ApiResponse({
    status: 200,
    description: 'Start a session',
    type: [Session],
  })
  async startSession(
    @Param('sessionId') sessionId: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionService.startSession(+sessionId, user.userId);
  }

  @Post(':sessionId/stop')
  @ApiOperation({ summary: 'Stop a session' })
  @ApiResponse({
    status: 200,
    description: 'Stop a session',
    type: [Session],
  })
  async stopSession(
    @Param('sessionId') sessionId: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionService.stopSession(+sessionId, user.userId);
  }
}
