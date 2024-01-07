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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
