import { SessionCustomService } from './session_custom.service';
import * as bcrypt from 'bcrypt';
import { Session } from '../session/entities/session.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Pose } from '../poses/entities/pose.entity';
import { NotFoundException } from '@nestjs/common';

jest
  .spyOn(bcrypt, 'hash')
  .mockImplementation(() =>
    Promise.resolve(
      '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
    ),
  );
describe('SessionCustomService', () => {
  it('should return SessionCustoms array whith id, title, description, duration, poses with fields when called with a valid id', async () => {
    const userId = 1;
    const expectedSessionCustoms = [
      {
        id: 1,
        title: 'testsession',
        description: 'testdescription',
        duration: 10,
        poses: ['testpose1', 'testpose2'],
        isCustom: true,
      },
      {
        id: 2,
        title: 'testsession2',
        description: 'testdescription2',
        duration: 15,
        poses: ['testpose11', 'testpose26'],
        isCustom: true,
      },
      {
        id: 3,
        title: 'testsession3',
        description: 'testdescription3',
        duration: 20,
        poses: ['testpose32', 'testpose2', 'testpose9'],
        isCustom: true,
      },
    ];
    const sessionCustomRepositoryMock = {
      find: jest.fn().mockResolvedValue(expectedSessionCustoms),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.getSessionCustoms(userId);

    expect(result).toEqual(expectedSessionCustoms);
    expect(sessionCustomRepositoryMock.find).toHaveBeenCalledWith({
      where: { user: { id: userId }, isCustom: true },
    });
  });

  it('should return a SessionCustom object with id, title, description, duration, poses with fields when called with a valid id ', async () => {
    const userId = 1;
    const expectedSessionCustom = {
      id: 1,
      title: 'testsession',
      description: 'testdescription',
      duration: 10,
      poses: ['testpose1', 'testpose2'],
    };
    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(expectedSessionCustom),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.getSessionCustom(
      userId,
      expectedSessionCustom.id,
    );

    expect(result).toEqual(expectedSessionCustom);
    expect(sessionCustomRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        user: expect.objectContaining({ id: userId }),
        id: expectedSessionCustom.id,
        isCustom: true,
      },
    });
  });

  it('should create a new SessionCustom object and return it when called with a valid CreateSessionCustomDto', async () => {
    const createSessionCustomDto = {
      title: 'testsession',
      description: 'testdescription',
      duration: 10,
    };

    const userId = 1;

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockReturnValue(createSessionCustomDto),
      create: jest.fn().mockReturnValue(createSessionCustomDto),
      save: jest.fn().mockResolvedValue(createSessionCustomDto),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.createSessionCustom(
      createSessionCustomDto,
      userId,
    );

    expect(result).toEqual(createSessionCustomDto);
    expect(sessionCustomRepositoryMock.create).toHaveBeenCalledWith({
      ...createSessionCustomDto,
      user: expect.objectContaining({ id: userId }),
      isCustom: true,
    });
    expect(sessionCustomRepositoryMock.insert).toHaveBeenCalledWith(
      createSessionCustomDto,
    );
  });

  it('should update a SessionCustom object and return it when called with a valid UpdateSessionCustomDto', async () => {
    const sessionId = 1;
    const updateSessionCustomDto = {
      id: sessionId,
      title: 'testsession',
      description: 'testdescription',
      duration: 10,
    };

    const userId = 1;

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ ...updateSessionCustomDto }),
      update: jest.fn().mockResolvedValue({ ...updateSessionCustomDto }),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.updateSessionCustom(
      sessionId,
      updateSessionCustomDto,
      userId,
    );

    expect(result).toEqual(updateSessionCustomDto);
    expect(sessionCustomRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        user: expect.objectContaining({ id: userId }),
        id: sessionId,
        isCustom: true,
      },
    });
    expect(sessionCustomRepositoryMock.update).toHaveBeenCalledWith(
      { id: sessionId, user: { id: userId } },
      expect.objectContaining({
        ...updateSessionCustomDto,
        duration: expect.any(Number),
        poses: undefined,
      }),
    );
  });

  it('should delete a SessionCustom object when called with a valid id', async () => {
    const sessionId = 1;

    const userId = 1;

    const deletedSession = { id: sessionId };

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ id: sessionId }),
      delete: jest.fn().mockResolvedValue({ ...deletedSession }),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.removeSessionCustom(
      sessionId,
      userId,
    );

    expect(result).toEqual(deletedSession);
    expect(sessionCustomRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        user: expect.objectContaining({ id: userId }),
        id: sessionId,
        isCustom: true,
      },
    });
    expect(sessionCustomRepositoryMock.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        id: sessionId,
      }),
    );
  });

  it('should throw a NotFoundException when called with an invalid id', async () => {
    const sessionId = 1;

    const userId = 1;

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(undefined),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );

    await expect(
      sessionCustomService.removeSessionCustom(sessionId, userId),
    ).rejects.toThrow(NotFoundException);
  });

  it('should add pose to session when called with a valid id', async () => {
    const poseId = 3;
    const sessionCustomId = 5;
    const userId = 1;

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ id: sessionCustomId }),
      query: jest.fn().mockResolvedValue({ id: sessionCustomId }),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ id: poseId }),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.addPoseToSessionCustom(
      sessionCustomId,
      poseId,
      userId,
    );
    expect(result).toEqual({ id: sessionCustomId, poses: [{ id: poseId }] });

    expect(sessionCustomRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        user: expect.objectContaining({ id: userId }),
        id: sessionCustomId,
        isCustom: true,
      },
    });
    expect(poseRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: poseId,
      },
    });
    expect(sessionCustomRepositoryMock.query).toHaveBeenCalledWith(
      'INSERT INTO Session_Pose (poseId, sessionId) VALUES (?,?)',
      [poseId, sessionCustomId],
    );
  });

  it('should remove pose from session when called with a valid id', async () => {
    const poseId = 3;
    const sessionCustomId = 5;
    const userId = 1;

    const sessionCustom = {
      id: sessionCustomId,
      poses: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(sessionCustom),
      query: jest.fn().mockResolvedValue({ id: sessionCustomId }),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ id: poseId }),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );
    const result = await sessionCustomService.removePoseFromSessionCustom(
      sessionCustomId,
      poseId,
      userId,
    );
    expect(result).toEqual(sessionCustom);

    expect(sessionCustomRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        user: expect.objectContaining({ id: userId }),
        id: sessionCustomId,
        isCustom: true,
      },
    });
    expect(poseRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: poseId,
      },
    });
    expect(sessionCustomRepositoryMock.query).toHaveBeenCalledWith(
      'DELETE FROM `Session_Pose` WHERE `poseId` = ? AND `sessionId` = ?',
      [poseId, sessionCustomId],
    );
  });

  it('should throw a NotFoundException when called with an invalid pose id', async () => {
    const poseId = 3;
    const sessionCustomId = 5;
    const userId = 1;

    const sessionCustomRepositoryMock = {
      findOne: jest.fn().mockResolvedValue({ id: sessionCustomId }),
      query: jest.fn().mockResolvedValue({ id: sessionCustomId }),
      insert: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ raw: { insertId: 1 } })),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockReturnValue({ id: userId }),
    } as unknown as Repository<User>;

    const poseRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(undefined),
    } as unknown as Repository<Pose>;

    const sessionCustomService = new SessionCustomService(
      sessionCustomRepositoryMock,
      poseRepositoryMock,
      userRepositoryMock,
    );

    await expect(
      sessionCustomService.addPoseToSessionCustom(
        sessionCustomId,
        poseId,
        userId,
      ),
    ).rejects.toThrow(NotFoundException);
  });
});
