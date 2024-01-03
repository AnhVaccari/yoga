import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DifficultiesService } from './difficulties.service';

@ApiBearerAuth()
@ApiTags('yoga')
@Controller('difficulty')
export class DifficultiesController {
  constructor(private readonly difficultiesService: DifficultiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all difficulty levels' })
  @ApiResponse({
    status: 200,
    description: 'List of difficulty levels',
    type: [DifficultiesService],
  })
  async getDifficulties() {
    return this.difficultiesService.getDifficulties();
  }
}
