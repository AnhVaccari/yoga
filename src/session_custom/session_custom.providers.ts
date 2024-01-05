import { DataSource } from 'typeorm';
import { SessionCustom } from './entities/session_custom.entity';

export const sessionCustomProviders = [
  {
    provide: 'SESSION_CUSTOM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SessionCustom),
    inject: ['DATA_SOURCE'],
  },
];
