import { DataSource } from 'typeorm';
import { Session } from './entities/session.entity';
import { userProviders } from '../user/user.providers';
import { posesProviders } from '../poses/poses.providers';
import { launchedSessionProviders } from '../launched_session/launched_session.providers';

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
