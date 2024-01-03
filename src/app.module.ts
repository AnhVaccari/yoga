import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { SessionCustomModule } from './session_custom/session_custom.module';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { PosesModule } from './poses/poses.module';

@Module({
  imports: [
    CategoriesModule,
    SessionCustomModule,
    DifficultiesModule,
    SessionsModule,
    UsersModule,
    PosesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
