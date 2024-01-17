import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  allControllersAppModule,
  allModulesApp,
  allProvidersAppModule,
} from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setupDataSource } from './setup';
import { UserService } from '../src/user/user.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const dataSource = await setupDataSource();
    const mockUserService = {
      findOne: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          username: 'Ana',
          password:
            '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
          date_joined: new Date(),
        }),
      ),
      getUser: jest.fn().mockImplementation(() =>
        Promise.resolve({
          id: 1,
          username: 'Ana',
          password:
            '$2b$10$5B9FB.4Idhk2H1dLI9xeIutY8WATBCuMMPLdMMTyhp/3..hwAW9mW',
          date_joined: new Date(),
        }),
      ),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as UserService;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
          }),
          dataSourceFactory: async () => dataSource,
        }),
        ...allModulesApp,
      ],
      controllers: [...allControllersAppModule],
      providers: [...allProvidersAppModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (GET)- good', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Ana', password: 'azerty' })
      .expect(201);
  });

  it('/auth/login (GET) - failed', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Ana', password: 'wrong password' })
      .expect(401);
  });
});
