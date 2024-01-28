import { IsNull, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';
import { User } from '../user/entities/user.entity';
import { LaunchedSession } from 'src/launched_session/entities/launched_session.entity';
import { BadRequestException } from '@nestjs/common';
import { Pose } from '../poses/entities/pose.entity';

jest
  .spyOn(bcrypt, 'hash')
  .mockImplementation(() =>
    Promise.resolve(
      '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
    ),
  );
describe('SessionService', () => {
  // getSessions method returns an array of Session objects with id, title, description, duration, difficulty fields
  it('should return Sessions array with id, title, description, duration, difficulty fields', async () => {
    const expectedSession = [
      {
        id: 1,
        title: 'Core yoga',
        description: 'testdescription1',
        duration: 10,
        difficulty: 1,
        poses: [
          {
            id: 1,
            sanskrit_name: 'testpose',
            englisht_name: 'testpose',
            description: 'testdescription',
            benefits: 'testbenefits',
          },
          {
            id: 2,
            sanskrit_name: 'testpose',
            englisht_name: 'testpose',
            description: 'testdescription',
            benefits: 'testbenefits',
          },
        ],
      },
      {
        id: 2,
        title: 'Tree yoga',
        description: 'testdescription2',
        duration: 25,
        difficulty: 3,
        poses: [
          {
            id: 22,
            sanskrit_name: 'testpose',
            englisht_name: 'testpose',
            description: 'testdescription',
            benefits: 'testbenefits',
          },
          {
            id: 18,
            sanskrit_name: 'testpose',
            englisht_name: 'testpose',
            description: 'testdescription',
            benefits: 'testbenefits',
          },
        ],
      },
    ];

    const sessionRepositoryMock = {
      find: jest.fn().mockResolvedValue(expectedSession),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn(),
    } as unknown as Repository<User>;

    const launchedSessionRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<LaunchedSession>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
    );
    const result = await sessionService.getSessions();

    expect(result).toEqual(expectedSession);

    expect(sessionRepositoryMock.find).toHaveBeenCalled();
  });

  it('should start a session when called with a valid session id and user id', async () => {
    const userId = 1;
    const sessionId = 1;

    const user = { id: userId };

    const session = { id: sessionId };

    const ongoingSession = null;

    const sessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(session),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(user),
    } as unknown as Repository<User>;

    const launchedSessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(ongoingSession),
      save: jest.fn(),
    } as unknown as Repository<LaunchedSession>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
    );

    const result = await sessionService.startSession(userId, sessionId);

    expect(sessionRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: sessionId },
    });

    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: userId },
    });

    expect(launchedSessionRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        end_date: IsNull(),
        user: { id: userId },
      },
    });

    expect(launchedSessionRepositoryMock.save).toHaveBeenCalledWith({
      user: { id: userId },
      session: { id: sessionId },
      start_date: expect.any(Date),
    });

    expect(result).toEqual(session);
  });

  it('should return an error when called with an ongoing session id', async () => {
    const userId = 1;
    const sessionId = 1;

    const user = { id: userId };

    const session = { id: sessionId };

    const ongoingSession = { id: 1 };

    const sessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(session),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(user),
    } as unknown as Repository<User>;

    const launchedSessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(ongoingSession),
      save: jest.fn(),
    } as unknown as Repository<LaunchedSession>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
    );

    try {
      await sessionService.startSession(userId, sessionId);
    } catch (error) {
      expect(error).toEqual(
        new BadRequestException('Une session est déjà en cours'),
      );

      expect(sessionRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });

      expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });

      expect(launchedSessionRepositoryMock.findOne).toHaveBeenCalledWith({
        where: {
          end_date: IsNull(),
          user: { id: userId },
        },
      });

      expect(launchedSessionRepositoryMock.save).not.toHaveBeenCalled();
    }
  });

  it('should stop a session when called with a valid session id and user id', async () => {
    const userId = 1;
    const sessionId = 1;

    const user = { id: userId };

    const session = { id: sessionId };

    const ongoingSession = {
      id: 1,
      user: { id: userId },
      session: { id: sessionId },
      start_date: new Date(),
    };
    const sessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(session),
    } as unknown as Repository<Session>;

    const userRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(user),
    } as unknown as Repository<User>;

    const launchedSessionRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(ongoingSession),
      save: jest.fn(),
    } as unknown as Repository<LaunchedSession>;

    const poseRepositoryMock = {
      find: jest.fn(),
    } as unknown as Repository<Pose>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      userRepositoryMock,
      launchedSessionRepositoryMock,
      poseRepositoryMock,
    );

    const result = await sessionService.stopSession(userId, sessionId);

    expect(sessionRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: sessionId },
    });

    expect(launchedSessionRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        end_date: IsNull(),
        user: { id: userId },
      },
    });

    expect(launchedSessionRepositoryMock.save).toHaveBeenCalledWith({
      id: ongoingSession.id,
      user: { id: userId },
      session: { id: sessionId },
      start_date: ongoingSession.start_date,
      end_date: expect.any(Date),
    });

    expect(result).toEqual(session);
  });

  it('should return total session count for a user', async () => {
    const userId = 1;
    const expectedCount = 5;

    const sessionRepositoryMock = {
      count: jest.fn().mockResolvedValue(expectedCount),
    } as unknown as Repository<Session>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      null,
      null,
      null,
    );

    const result = await sessionService.getTotalSessionCount(userId);

    expect(result).toEqual(expectedCount);
    expect(sessionRepositoryMock.count).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });
  });

  it('should return average session duration for a user', async () => {
    const userId = 1;
    const sum = 150;
    const count = 3;
    const expectedAverage = sum / count;

    const sessionRepositoryMock = {
      createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ sum, count }),
      })),
    } as unknown as Repository<Session>;

    const sessionService = new SessionService(
      sessionRepositoryMock,
      null,
      null,
      null,
    );
    const result = await sessionService.getAverageSessionDuration(userId);

    expect(result).toEqual(expectedAverage);
  });

  it('should return most practiced poses for a user', async () => {
    const userId = 1;
    const topN = 2;
    const expectedPoses = [
      {
        id: '1',
        sanskrit_name: 'Pose1',
        english_name: 'Pose1English',
        sessionCount: '5',
      },
      {
        id: '2',
        sanskrit_name: 'Pose2',
        english_name: 'Pose2English',
        sessionCount: '3',
      },
    ];

    const poseRepositoryMock = {
      createQueryBuilder: jest.fn(() => ({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(expectedPoses),
      })),
    } as unknown as Repository<Pose>;

    const sessionService = new SessionService(
      null,
      null,
      null,
      poseRepositoryMock,
    );

    const result = await sessionService.getMostPracticedPoses(userId, topN);

    expect(result).toEqual(expectedPoses);
  });
});
