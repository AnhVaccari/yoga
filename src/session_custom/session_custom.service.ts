import { Injectable } from '@nestjs/common';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';

@Injectable()
export class SessionCustomService {
  create(createSessionCustomDto: CreateSessionCustomDto) {
    return 'This action adds a new sessionCustom';
  }

  findAll() {
    return `This action returns all sessionCustom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionCustom`;
  }

  update(id: number, updateSessionCustomDto: UpdateSessionCustomDto) {
    return `This action updates a #${id} sessionCustom`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionCustom`;
  }
}
