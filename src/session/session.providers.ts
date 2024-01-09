import { DataSource } from 'typeorm';
import { Session } from './entities/session.entity';
import { userProviders } from 'src/user/user.providers';
import { posesProviders } from 'src/poses/poses.providers';
import { launchedSessionProviders } from 'src/launched_session/launched_session.providers';

export const sessionProviders = [
  {
    provide: 'SESSIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: ['DATA_SOURCE'],
  },
  ...posesProviders,
  ...userProviders,
  ...launchedSessionProviders,
];
