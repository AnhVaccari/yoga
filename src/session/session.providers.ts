import { DataSource } from 'typeorm';
import { Session } from './entities/session.entity';

export const sessionProviders = [
  {
    provide: 'SESSIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: ['DATA_SOURCE'],
  },
];
