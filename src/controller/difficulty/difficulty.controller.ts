import { Controller, Get } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';

@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) {}

  @Get()
  async findAll() {
    return this.difficultyService.findAll();
  }
}
