import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LaunchedSession } from '../launched_session/entities/launched_session.entity';
import { Session } from '../session/entities/session.entity';
import { Pose } from '../poses/entities/pose.entity';

jest
  .spyOn(bcrypt, 'hash')
  .mockImplementation(() =>
    Promise.resolve(
      '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
    ),
  );

describe('UserService', () => {
  let launchedSessionRepositoryMock: Repository<LaunchedSession>;
  // getUser method returns a User object with id, username, email, and date_joined fields
  it('should return a User object with id, username, email, and date_joined fields when called with a valid id', () => {
    // Arrange
    const id = 1;
    const expectedUser = {
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      date_joined: new Date(),
    };
    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(expectedUser),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionRepositoryMock = {
      find: jest.fn().mockResolvedValue([]),
    } as unknown as Repository<Session>;

    launchedSessionRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<LaunchedSession>;
    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );

    // Act
    const result = userService.getUser(id);

    // Assert
    expect(result).resolves.toEqual(expectedUser);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      select: ['id', 'username', 'email', 'date_joined'],
      where: { id: id },
    });
  });

  // createUser method creates a new User object with hashed password and returns it
  it('should create a new User object with hashed password and return it when called with a valid CreateUserDto', async () => {
    const saltRounds = 20;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash('azerty', salt);

    const createUserDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'azerty',
    };
    const expectedUser = {
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: hashedPassword,
      date_joined: new Date(),
    };
    const userRepositoryMock = {
      create: jest.fn().mockReturnValue(expectedUser),
      save: jest.fn().mockResolvedValue(expectedUser),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionRepositoryMock = {
      find: jest.fn().mockResolvedValue([]),
    } as unknown as Repository<Session>;

    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );

    // Act
    const result = await userService.createUser(createUserDto);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: hashedPassword,
    });
    expect(userRepositoryMock.save).toHaveBeenCalledWith(expectedUser);
  });

  // updateUser method updates a User object with given id and returns it
  it('should update a User object with given id and return it when called with a valid id and UpdateUserDto', async () => {
    // Arrange
    const id = 1;
    const updateUserDto = {
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'updatedpassword',
    };
    const expectedUser = {
      id: 1,
      username: 'updateduser',
      email: 'updateduser@example.com',
      password: 'updatedpassword',
      date_joined: new Date(),
    };
    const userRepositoryMock = {
      update: jest.fn(),
      findOne: jest.fn().mockResolvedValue(expectedUser),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionRepositoryMock = {
      find: jest.fn().mockResolvedValue([]),
    } as unknown as Repository<Session>;

    const userService = new UserService(
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
      sessionRepositoryMock,
    );

    // Act
    const result = await userService.updateUser(id, updateUserDto);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(userRepositoryMock.update).toHaveBeenCalledWith(
      { id: id },
      updateUserDto,
    );
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: id },
    });
  });
});
