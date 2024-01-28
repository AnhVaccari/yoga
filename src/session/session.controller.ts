import { SessionService } from './session.service';
import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@ApiBearerAuth()
@ApiTags('Session')
@UseGuards(JwtAuthGuard)
@Controller('session')
export class SessionController {
  constructor(
    @InjectRepository(Session)
    protected readonly repository: Repository<Session>,
    private readonly sessionService: SessionService,
  ) {}

  @Get('search')
  @ApiOperation({ summary: 'Search sessions' })
  @ApiResponse({
    status: 200,
    description: 'List of sessions',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public search(@Query('term') term: string) {
    console.log(term);
    return this.sessionService.search(term);
  }

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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getOneSession(@Param('id') id: string) {
    return this.sessionService.getSession(+id);
  }

  @Get('difficulty/:id')
  @ApiOperation({ summary: 'Get sessions by difficulty' })
  @ApiResponse({
    status: 200,
    description: 'List of sessions by difficulty',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getSessionsByDifficulty(@Param('id') id: string) {
    return this.sessionService.getSessionsByDifficulty(+id);
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

  @Get('statistics')
  @ApiOperation({ summary: 'Get pratice statistics' })
  @ApiResponse({
    status: 200,
    description: 'Pratice statistics',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getStatistics(@UserAuthenticated() user: IUserAuthenticated) {
    const totalSessionCount = await this.sessionService.getTotalSessionCount(
      user.userId,
    );

    const averageSessionDuration =
      await this.sessionService.getAverageSessionDuration(user.userId);

    const mostPracticedPoses = await this.sessionService.getMostPracticedPoses(
      user.userId,
      5,
    );

    return {
      userId: user.userId,
      totalSessionCount,
      averageSessionDuration,
      mostPracticedPoses,
    };
  }
}
