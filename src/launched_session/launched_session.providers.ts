import { DataSource } from 'typeorm';
import { LaunchedSession } from './entities/launched_session.entity';

export const launchedSessionProviders = [
  {
    provide: 'LAUNCHED_SESSIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LaunchedSession),
    inject: ['DATA_SOURCE'],
  },
];
