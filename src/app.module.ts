import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { SessionCustomModule } from './session_custom/session_custom.module';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { PosesModule } from './poses/poses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseLogger from './database/logger';

export const allModulesApp = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  CategoriesModule,
  SessionCustomModule,
  DifficultiesModule,
  SessionModule,
  UserModule,
  PosesModule,
  AuthModule,
];

export const allProvidersAppModule = [AppService];

export const allControllersAppModule = [AppController];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: parseInt(process.env.TYPEORM_PORT) || 3306,
      username: process.env.TYPEORM_USER || 'root',
      password: process.env.TYPEORM_PASS || '',
      database: process.env.TYPEORM_DB || 'yoga',
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNC === 'true',
      debug: process.env.TYPEORM_DEBUG === 'true',
      logging: process.env.TYPEORM_LOGS === 'true',
      logger: new DatabaseLogger(),
    }),
    ...allModulesApp,
  ],
  controllers: [...allControllersAppModule],
  providers: [...allProvidersAppModule],
})
export class AppModule {}
