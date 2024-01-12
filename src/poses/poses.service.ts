import { Injectable } from '@nestjs/common';
import { Pose } from './entities/pose.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PosesService {
  constructor(
    @InjectRepository(Pose)
    private posesRepository: Repository<Pose>,
  ) {}

  async getPoses(): Promise<Pose[]> {
    return this.posesRepository.find();
  }

  async getPose(id: number) {
    return this.posesRepository.findOne({ where: { id: id } });
  }
}
