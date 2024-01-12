import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DifficultiesService {
  constructor(
    @InjectRepository(Difficulty)
    private difficultiesRepository: Repository<Difficulty>,
  ) {}

  async getDifficulties(): Promise<Difficulty[]> {
    return this.difficultiesRepository.find();
  }
}
