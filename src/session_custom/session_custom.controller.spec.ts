import { SessionCustomService } from './session_custom.service';
import { SessionCustomController } from './session_custom.controller';
import { Repository } from 'typeorm';
import { Session } from '../session/entities/session.entity';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Pose } from '../poses/entities/pose.entity';
import { IUserAuthenticated } from '../decorators/user-authenticated.decorator';
import { NotFoundException } from '@nestjs/common';

jest
  .spyOn(bcrypt, 'hash')
  .mockImplementation(() =>
    Promise.resolve(
      '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
    ),
  );

describe('SessionCustomController', () => {
  let sessionCustomRepositoryMock: Repository<Session>;
  let poseRepositoryMock: Repository<Pose>;
  let userRepositoryMock: Repository<User>;

  beforeEach(() => {
    sessionCustomRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      save: jest.fn(),
      query: jest.fn(),
    } as unknown as Repository<Session>;

    userRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<User>;

    poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;
  });

  it('should get all session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );

    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );
    const expectedUser: IUserAuthenticated = {
      userId: 1,
      username: 'testuser',
    };

    const expectedSessionCustoms = [
      {
        id: 1,
        title: 'testsession',
        description: 'testdescription',
        duration: 10,
        poses: ['testpose1', 'testpose2'],
      },
      {
        id: 2,
        title: 'testsession2',
        description: 'testdescription2',
        duration: 15,
        poses: ['testpose11', 'testpose26'],
      },
      {
        id: 3,
        title: 'testsession3',
        description: 'testdescription3',
        duration: 20,
        poses: ['testpose32', 'testpose2', 'testpose9'],
      },
    ];

    sessionCustomRepositoryMock.find = jest
      .fn()
      .mockResolvedValue(expectedSessionCustoms);

    const result =
      await sessionCustomController.getAllSessionCustoms(expectedUser);

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          duration: expect.any(Number),
          poses: expect.any(Array),
        }),
      ]),
    );
  });

  it('should get one session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 1,
      username: 'testuser',
    };

    const expectedSessionCustom = {
      id: 10,
      title: 'testsession10',
      description: 'testdescription10',
      duration: 30,
      poses: ['testpose1', 'testpose12', 'testpose22'],
    };

    sessionCustomRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue(expectedSessionCustom);

    const result = await sessionCustomController.getSessionCustom(
      expectedUser.userId.toString(),
      expectedUser,
    );

    expect(result).toBeDefined();
    expect(result).toEqual(expectedSessionCustom);
  });

  it('should create a session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 1,
      username: 'testuser',
    };

    const createSessionCustomDto = {
      title: 'testsession20',
      description: 'testdescription20',
      duration: 5,
    };

    userRepositoryMock.findOne = jest.fn().mockResolvedValue(expectedUser);

    sessionCustomRepositoryMock.create = jest
      .fn()
      .mockResolvedValue({ ...createSessionCustomDto });

    sessionCustomRepositoryMock.save = jest
      .fn()
      .mockResolvedValue({ ...createSessionCustomDto, id: 1 });

    const result = await sessionCustomController.create(
      createSessionCustomDto,
      expectedUser,
    );

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        description: expect.any(String),
        duration: expect.any(Number),
      }),
    );
  });

  it('should update a session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 2,
      username: 'testuser2',
    };

    const updateSessionCustomDto = {
      title: 'Azertyuuioop',
    };

    sessionCustomRepositoryMock.update = jest
      .fn()
      .mockResolvedValue({ ...updateSessionCustomDto });

    sessionCustomRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue({ ...updateSessionCustomDto, id: 2 });

    const result = await sessionCustomController.update(
      '2',
      updateSessionCustomDto,
      expectedUser,
    );

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
      }),
    );
  });

  it('should delete a session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 2,
      username: 'testuser2',
    };

    const expectedSessionCustom = {
      id: 2,
      title: 'testsession2',
      description: 'testdescription2',
      duration: 15,
    };

    sessionCustomRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue(expectedSessionCustom);

    sessionCustomRepositoryMock.delete = jest
      .fn()
      .mockResolvedValue(expectedSessionCustom);

    const result = await sessionCustomController.delete('2', expectedUser);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedSessionCustom);
  });

  it('should add a pose to a session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 2,
      username: 'testuser2',
    };

    const existingSessionCustom = {
      id: 2,
      title: 'testsession2',
      description: 'testdescription2',
      duration: 15,
      poses: [
        { id: 1, sanskrit_name: 'testpose11' },
        { id: 2, sanskrit_name: 'testpose26' },
      ],
    };

    sessionCustomRepositoryMock.findOne = jest.fn().mockResolvedValue({
      ...existingSessionCustom,
      poses: [...existingSessionCustom.poses],
    });

    const newPose = {
      id: 3,
      sanskrit_name: 'testpose3',
    };

    poseRepositoryMock.findOne = jest.fn().mockResolvedValue(newPose);

    sessionCustomRepositoryMock.query = jest.fn().mockResolvedValue(true);

    const result = await sessionCustomController.addPoseToSessionCustom(
      existingSessionCustom.id,
      newPose.id,
      expectedUser,
    );

    expect(result).toBeDefined();
    expect(result.poses).toHaveLength(3);
    expect(result.poses).toContainEqual(newPose);
    expect(result).toMatchObject({
      ...existingSessionCustom,
      poses: expect.arrayContaining([expect.objectContaining(newPose)]),
    });
  });

  it('should remove a pose from a session_custom', async () => {
    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );

    const sessionCustomController = new SessionCustomController(
      sessionCustomService,
    );

    const expectedUser: IUserAuthenticated = {
      userId: 2,
      username: 'testuser2',
    };

    const existingSessionCustom = {
      id: 2,
      title: 'testsession2',
      description: 'testdescription2',
      duration: 15,
      poses: [
        { id: 1, sanskrit_name: 'testpose11' },
        { id: 2, sanskrit_name: 'testpose26' },
        { id: 3, sanskrit_name: 'testpose' },
      ],
    };

    const poseIdToRemove = 3;

    sessionCustomRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue(existingSessionCustom);

    poseRepositoryMock.findOne = jest
      .fn()
      .mockResolvedValue(
        existingSessionCustom.poses.find((p) => p.id === poseIdToRemove),
      );

    sessionCustomRepositoryMock.query = jest
      .fn()
      .mockResolvedValue({ affected: 1 });

    const poseToRemove = existingSessionCustom.poses.find(
      (pose) => pose.id === poseIdToRemove,
    );

    if (!poseToRemove) {
      throw new NotFoundException('POSE NOT FOUND');
    }

    const result = await sessionCustomController.removePoseFromSessionCustom(
      existingSessionCustom.id,
      poseIdToRemove,
      expectedUser,
    );

    expect(result).toBeDefined();
    expect(result.poses).toHaveLength(2);
    expect(result.poses).not.toContainEqual(poseToRemove);

    expect(sessionCustomRepositoryMock.query).toHaveBeenCalledWith(
      'DELETE FROM `sessionCustom_pose` WHERE `poseId` = ? AND `sessionCustomId` = ?',
      [poseIdToRemove, existingSessionCustom.id],
    );
  });
});
