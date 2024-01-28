import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Pose } from '../poses/entities/pose.entity';
import { Session } from '../session/entities/session.entity';

jest
  .spyOn(bcrypt, 'hash')
  .mockImplementation(() =>
    Promise.resolve(
      '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
    ),
  );

describe('UserController', () => {
  let userRepositoryMock: Repository<User>;
  let launchedSessionRepositoryMock: Repository<LaunchedSession>;
  let poseRepositoryMock: Repository<Pose>;
  let sessionRepositoryMock: Repository<Session>;

  beforeEach(() => {
    const expectedUser = {
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      date_joined: new Date(),
      launchedSession: [],
    };
    userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(expectedUser),
      create: jest.fn().mockReturnValue(expectedUser),
      update: jest.fn(),
      save: jest.fn().mockResolvedValue(expectedUser),
    } as unknown as Repository<User>;

    launchedSessionRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<LaunchedSession>;

    poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    sessionRepositoryMock = {
      find: jest.fn().mockResolvedValue([]),
    } as unknown as Repository<Session>;
  });

  // UserController can get user profile successfully
  it('should get user profile successfully', async () => {
    // Arrange
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const user = { userId: 1, username: 'john' };

    // Act
    const result = await userController.getOneUser(user);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        date_joined: expect.any(Date),
      }),
    );
  });

  // UserController can get user history of launched session successfully
  it('should get user history of launched session successfully', async () => {
    // Arrange
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const user = { userId: 1, username: 'john' };

    // Act
    const result = await userController.getHistory(user);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  // UserController can create a new user successfully
  it('should create a new user successfully', async () => {
    userRepositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const createUserDto = {
      username: 'jane',
      email: 'jane@example.com',
      password: 'password123',
      date_joined: new Date(),
    };

    // Act
    const result = await userController.create(createUserDto);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        date_joined: expect.any(Date),
      }),
    );
  });

  // UserController throws NotFoundException when user profile is not found
  it('should throw NotFoundException when user profile is not found', async () => {
    userRepositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const user = { userId: 1, username: 'john' };

    // Act and Assert
    await expect(userController.getOneUser(user)).rejects.toThrowError(
      NotFoundException,
    );
  });

  // UserController throws ConflictException when trying to create a user that already exists
  it('should throw ConflictException when trying to create a user that already exists', async () => {
    // Arrange
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const createUserDto = {
      username: 'jane',
      email: 'jane@example.com',
      password: 'password123',
      date_joined: new Date(),
    };

    // Assert
    await expect(userController.create(createUserDto)).rejects.toThrowError(
      ConflictException,
    );
  });

  // UserController throws BadRequestException when create user dto is not valid
  it('should throw BadRequestException when create user dto is not valid', async () => {
    // Arrange
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );
    const userController = new UserController(userService);
    const createUserDto = {
      username: 'jane',
      email: 'jane@example.com',
      password: 'password',
      date_joined: new Date(),
    };

    // Act and Assert
    await expect(userController.create(createUserDto)).rejects.toThrowError(
      ConflictException,
    );
  });
});
