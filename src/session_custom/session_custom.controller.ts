import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Session } from '../session/entities/session.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from '../decorators/user-authenticated.decorator';

@ApiBearerAuth()
@ApiTags('SessionCustom')
@UseGuards(JwtAuthGuard)
@Controller('session-custom')
export class SessionCustomController {
  constructor(private readonly sessionCustomService: SessionCustomService) {}

  @Get()
  @ApiOperation({ summary: 'Get all session customs' })
  @ApiResponse({
    status: 200,
    description: 'List of session customs',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllSessionCustoms(@UserAuthenticated() user: IUserAuthenticated) {
    return this.sessionCustomService.getSessionCustoms(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session custom' })
  @ApiResponse({
    status: 200,
    description: 'One session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getSessionCustom(
    @Param('id') id: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.getSessionCustom(+id, user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create session custom' })
  @ApiResponse({
    status: 201,
    description: 'Create session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async create(
    @Body() createSessionCustomDto: CreateSessionCustomDto,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.createSessionCustom(
      createSessionCustomDto,
      user.userId,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update session custom' })
  @ApiResponse({
    status: 200,
    description: 'Update session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSessionCustomDto: UpdateSessionCustomDto,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.updateSessionCustom(
      +id,
      updateSessionCustomDto,
      user.userId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete session custom' })
  @ApiResponse({
    status: 200,
    description: 'Delete session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async delete(
    @Param('id') id: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.removeSessionCustom(+id, user.userId);
  }

  @Post(':sessionCustomId/poses/:poseId')
  @ApiOperation({ summary: 'Add pose to session custom' })
  @ApiResponse({
    status: 200,
    description: 'Add pose to session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async addPoseToSessionCustom(
    @Param('sessionCustomId', ParseIntPipe) sessionCustomId: number,
    @Param('poseId', ParseIntPipe) poseId: number,
    @UserAuthenticated() user: IUserAuthenticated,
  ): Promise<Session> {
    return this.sessionCustomService.addPoseToSessionCustom(
      sessionCustomId,
      poseId,
      user.userId,
    );
  }

  @Delete(':sessionCustomId/poses/:poseId')
  @ApiOperation({ summary: 'Remove pose from session custom' })
  @ApiResponse({
    status: 200,
    description: 'Remove pose from session custom',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async removePoseFromSessionCustom(
    @Param('sessionCustomId', ParseIntPipe) sessionCustomId: number,
    @Param('poseId', ParseIntPipe) poseId: number,
    @UserAuthenticated() user: IUserAuthenticated,
  ): Promise<Session> {
    return this.sessionCustomService.removePoseFromSessionCustom(
      sessionCustomId,
      poseId,
      user.userId,
    );
  }
}
