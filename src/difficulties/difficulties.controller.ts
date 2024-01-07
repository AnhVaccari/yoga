import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulty.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('yoga')
@UseGuards(JwtAuthGuard)
@Controller('difficulty')
export class DifficultiesController {
  constructor(private readonly difficultiesService: DifficultiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all difficulty levels' })
  @ApiResponse({
    status: 200,
    description: 'List of difficulty levels',
    type: [Difficulty],
  })
  async getAllDifficulties() {
    return this.difficultiesService.getDifficulties();
  }
}
