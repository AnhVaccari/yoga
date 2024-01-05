import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUser(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id: id }, updateUserDto);
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async deleteUser(id: number): Promise<User> {
    await this.usersRepository.softDelete({ id: id });
    return this.usersRepository.findOne({ where: { id: id } });
  }
}
