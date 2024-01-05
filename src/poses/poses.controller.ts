import { Controller, Get, Param } from '@nestjs/common';
import { PosesService } from './poses.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Pose } from './entities/pose.entity';

@ApiBearerAuth()
@ApiTags('yoga')
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
