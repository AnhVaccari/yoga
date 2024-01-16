import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PosesService } from './poses.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pose } from './entities/pose.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('yoga')
@UseGuards(JwtAuthGuard)
@Controller('pose')
export class PosesController {
  constructor(private readonly posesService: PosesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all poses' })
  @ApiResponse({
    status: 200,
    description: 'List of poses',
    type: [Pose],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllPoses() {
    return this.posesService.getPoses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one pose' })
  @ApiResponse({
    status: 200,
    description: 'One pose',
    type: [Pose],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getOnePose(@Param('id') id: string) {
    return this.posesService.getPose(+id);
  }

  @Get('difficulty/:id')
  @ApiOperation({ summary: 'Get poses by difficulty' })
  @ApiResponse({
    status: 200,
    description: 'List of poses',
    type: [Pose],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getPosesByDifficulty(@Param('id') id: string) {
    return this.posesService.getPosesByDifficulty(+id);
  }
}
