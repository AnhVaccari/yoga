import { DataSource } from 'typeorm';
import { Sessions } from './entities/sessions.entity';

export const sessionsProviders = [
  {
    provide: 'SESSIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Sessions),
    inject: ['DATA_SOURCE'],
  },
];
