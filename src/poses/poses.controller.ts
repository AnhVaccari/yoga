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
  async getOnePose(@Param('id') id: string) {
    return this.posesService.getPose(+id);
  }
}
