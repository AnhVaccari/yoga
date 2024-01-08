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
  async getAllSessionCustoms() {
    return this.sessionCustomService.getSessionCustoms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one session_custom' })
  @ApiResponse({
    status: 200,
    description: 'One session_custom',
    type: [SessionCustom],
  })
  async getSessionCustom(@Param('id') id: string) {
    return this.sessionCustomService.getSessionCustom(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Create session_custom',
    type: [SessionCustom],
  })
  async create(@Body() createSessionCustomDto: CreateSessionCustomDto) {
    return this.sessionCustomService.createSessionCustom(
      createSessionCustomDto,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Update session_custom',
    type: [SessionCustom],
  })
  async update(
    @Param('id') id: string,
    @Body() updateSessionCustomDto: UpdateSessionCustomDto,
  ) {
    return this.sessionCustomService.updateSessionCustom(
      +id,
      updateSessionCustomDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete session_custom' })
  @ApiResponse({
    status: 200,
    description: 'Delete session_custom',
    type: [SessionCustom],
  })
  async delete(@Param('id') id: string) {
    return this.sessionCustomService.removeSessionCustom(+id);
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
  ): Promise<SessionCustom> {
    return this.sessionCustomService.addPoseToSessionCustom(
      sessionCustomId,
      poseId,
    );
  }
}
