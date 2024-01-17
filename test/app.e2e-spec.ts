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

describe('App (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const dataSource = await setupDataSource();

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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
