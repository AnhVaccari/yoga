import { DataSource } from 'typeorm';
import { SessionCustom } from './entities/session_custom.entity';
import { posesProviders } from '../poses/poses.providers';
import { userProviders } from '../user/user.providers';

export const sessionCustomProviders = [
  {
    provide: 'SESSION_CUSTOM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SessionCustom),
    inject: ['DATA_SOURCE'],
  },
  ...posesProviders,
  ...userProviders,
];
