import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Difficulty } from '../../entity/difficulty.entity';

@Injectable()
export class DifficultyService {
  constructor(
    @Inject('DIFFICULTY_REPOSITORY')
    private difficultyRepository: Repository<Difficulty>,
  ) {}

  async findAll(): Promise<Difficulty[]> {
    return this.difficultyRepository.find();
  }
}
