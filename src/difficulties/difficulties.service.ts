import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';

@Injectable()
export class DifficultiesService {
  constructor(
    @Inject('DIFFICULTIES_REPOSITORY')
    private difficultiesRepository: Repository<Difficulty>,
  ) {}

  async getDifficulties(): Promise<Difficulty[]> {
    return this.difficultiesRepository.find();
  }
}
