import { Injectable } from '@nestjs/common';
import { CreatePoseDto } from './dto/create-pose.dto';
import { UpdatePoseDto } from './dto/update-pose.dto';

@Injectable()
export class PosesService {
  create(createPoseDto: CreatePoseDto) {
    return 'This action adds a new pose';
  }

  findAll() {
    return `This action returns all poses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pose`;
  }

  update(id: number, updatePoseDto: UpdatePoseDto) {
    return `This action updates a #${id} pose`;
  }

  remove(id: number) {
    return `This action removes a #${id} pose`;
  }
}
