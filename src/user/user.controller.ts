import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from '../decorators/user-authenticated.decorator';

@ApiBearerAuth()
@ApiTags('yoga')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profil' })
  @ApiResponse({
    status: 200,
    description: 'User profil',
    type: [User],
  })
  async getOneUser(@UserAuthenticated() user: IUserAuthenticated) {
    return this.userService.getUser(user.userId);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get history of launched session' })
  @ApiResponse({
    status: 200,
    description: 'History of launched session',
    type: [User],
  })
  async getHistory(@UserAuthenticated() user: IUserAuthenticated) {
    return (await this.getOneUser(user)).launchedSession;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: [User],
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
