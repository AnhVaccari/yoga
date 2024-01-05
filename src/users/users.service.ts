import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getUser(id: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    await this.usersRepository.update({ user_id: id }, updateUserDto);
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async deleteUser(id: number): Promise<Users> {
    await this.usersRepository.softDelete({ user_id: id });
    return this.usersRepository.findOne({ where: { user_id: id } });
  }
}
