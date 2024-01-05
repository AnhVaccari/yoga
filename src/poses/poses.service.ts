import { Injectable, Inject } from '@nestjs/common';
import { Pose } from './entities/pose.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PosesService {
  constructor(
    @Inject('POSES_REPOSITORY')
    private posesRepository: Repository<Pose>,
  ) {}

  async getPoses(): Promise<Pose[]> {
    return this.posesRepository.find();
  }

  async getPose(id: number) {
    return this.posesRepository.findOne({ where: { id: id } });
  }
}
