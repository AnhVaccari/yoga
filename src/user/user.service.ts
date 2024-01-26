import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LaunchedSession)
    private launchedSessionRepository: Repository<LaunchedSession>,
  ) {}

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      select: ['id', 'username', 'email', 'date_joined'],
      where: { id: id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 20;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ id: id }, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUser(id: number): Promise<User> {
    await this.userRepository.softDelete({ id: id });
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async isSessionActive(userId: number) {
    const ongoingSession = await this.launchedSessionRepository.findOne({
      where: {
        user: { id: userId },
        end_date: IsNull(),
      },
    });

    if (!ongoingSession) {
      throw new NotFoundException('No active session');
    }

    return ongoingSession;
  }
}
