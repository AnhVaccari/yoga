import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SessionCustom } from './entities/session_custom.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from 'src/decorators/user-authenticated.decorator';

@ApiBearerAuth()
@ApiTags('yoga')
@UseGuards(JwtAuthGuard)
@Controller('session-custom')
export class SessionCustomController {
  constructor(private readonly sessionCustomService: SessionCustomService) {}

  @Get()
  @ApiOperation({ summary: 'Get all session_customs' })
  @ApiResponse({
    status: 200,
    description: 'List of session_customs',
    type: [SessionCustom],
  })
  async getAllSessionCustoms(@UserAuthenticated() user: IUserAuthenticated) {
    return this.sessionCustomService.getSessionCustoms(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session_custom' })
  @ApiResponse({
    status: 200,
    description: 'One session_custom',
    type: [SessionCustom],
  })
  async getSessionCustom(
    @Param('id') id: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.getSessionCustom(+id, user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Create session_custom',
    type: [SessionCustom],
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
  @ApiOperation({ summary: 'Update session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Update session_custom',
    type: [SessionCustom],
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
  @ApiOperation({ summary: 'Delete session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Delete session_custom',
    type: [SessionCustom],
  })
  async delete(
    @Param('id') id: string,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.removeSessionCustom(+id, user.userId);
  }

  @Post(':sessionCustomId/poses/:poseId')
  @ApiOperation({ summary: 'Add pose to session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Add pose to session_custom',
    type: [SessionCustom],
  })
  async addPoseToSessionCustom(
    @Param('sessionCustomId', ParseIntPipe) sessionCustomId: number,
    @Param('poseId', ParseIntPipe) poseId: number,
    @UserAuthenticated() user: IUserAuthenticated,
  ): Promise<SessionCustom> {
    return this.sessionCustomService.addPoseToSessionCustom(
      sessionCustomId,
      poseId,
      user.userId,
    );
  }

  @Delete(':sessionCustomId/poses/:poseId')
  @ApiOperation({ summary: 'Remove pose from session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Remove pose from session_custom',
    type: [SessionCustom],
  })
  async removePoseFromSessionCustom(
    @Param('sessionCustomId', ParseIntPipe) sessionCustomId: number,
    @Param('poseId', ParseIntPipe) poseId: number,
    @UserAuthenticated() user: IUserAuthenticated,
  ): Promise<SessionCustom> {
    return this.sessionCustomService.removePoseFromSessionCustom(
      sessionCustomId,
      poseId,
      user.userId,
    );
  }

  @Get(':sessionCustomId/history')
  @ApiOperation({ summary: 'Get session_custom history' })
  @ApiResponse({
    status: 200,
    description: 'Get session_custom history',
  })
  async getSessionCustomHistory(
    @Param('sessionCustomId', ParseIntPipe) sessionCustomId: number,
    @UserAuthenticated() user: IUserAuthenticated,
  ) {
    return this.sessionCustomService.getSessionCustomHistory(
      sessionCustomId,
      user.userId,
    );
  }
}
