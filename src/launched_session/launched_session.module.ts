import { Module } from '@nestjs/common';
import { launchedSessionProviders } from './launched_session.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...launchedSessionProviders],
})
export class LaunchedSessionModule {}
