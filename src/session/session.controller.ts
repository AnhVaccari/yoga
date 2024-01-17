import { SessionService } from './session.service';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Session } from './entities/session.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from '../decorators/user-authenticated.decorator';

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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllSessions(@UserAuthenticated() user: IUserAuthenticated) {
    return this.sessionService.getSessions(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session' })
  @ApiResponse({
    status: 200,
    description: 'One session',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getOneSession(
    @Param('id') id: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionService.getSession(+id, user.userId);
  }

  @Post(':sessionId/start')
  @ApiOperation({ summary: 'Start a session' })
  @ApiResponse({
    status: 200,
    description: 'Start a session',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async stopSession(
    @Param('sessionId') sessionId: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionService.stopSession(+sessionId, user.userId);
  }
}
