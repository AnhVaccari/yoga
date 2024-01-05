import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Users } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('yoga')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [Users],
  })
  async getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    description: 'One user',
    type: [Users],
  })
  async getOneUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: [Users],
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'Update user',
    type: [Users],
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'Delete user',
    type: [Users],
  })
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
