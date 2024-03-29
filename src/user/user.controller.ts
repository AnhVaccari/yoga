import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  IUserAuthenticated,
  UserAuthenticated,
} from '../decorators/user-authenticated.decorator';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { validate } from 'class-validator';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profil' })
  @ApiResponse({
    status: 200,
    description: 'User profil',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getOneUser(@UserAuthenticated() user: IUserAuthenticated) {
    const foundUser = await this.userService.getUser(user.userId);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  @Get('history')
  @ApiOperation({ summary: 'Get history of launched session' })
  @ApiResponse({
    status: 200,
    description: 'History of launched session',
    type: [LaunchedSession],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getHistory(@UserAuthenticated() user: IUserAuthenticated) {
    const userData = await this.getOneUser(user);
    return userData.launchedSession;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'Create user',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const validationErrors = await validate(createUserDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }
    return this.userService.createUser(createUserDto);
  }

  @Get('session/active')
  @ApiOperation({ summary: 'Get active session' })
  @ApiResponse({
    status: 200,
    description: 'Session active status',
    type: LaunchedSession,
  })
  @ApiResponse({
    status: 404,
    description: 'No active session',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async isSessionActive(@UserAuthenticated() user: IUserAuthenticated) {
    return this.userService.isSessionActive(user.userId);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get pratice statistics' })
  @ApiResponse({
    status: 200,
    description: 'Pratice statistics',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getStatistics(@UserAuthenticated() user: IUserAuthenticated) {
    const totalLaunchedSessionCount =
      await this.userService.getTotalSessionCount(user.userId);

    const averageSessionDuration =
      await this.userService.getAverageDailySessionDuration(user.userId);

    const mostPracticedPoses = await this.userService.getMostPracticedPoses(
      user.userId,
      5,
    );
    console.log('1', totalLaunchedSessionCount);
    console.log('2', averageSessionDuration);
    console.log('3', mostPracticedPoses);

    return {
      totalLaunchedSessionCount,
      averageSessionDuration,
      mostPracticedPoses,
    };
  }
}
