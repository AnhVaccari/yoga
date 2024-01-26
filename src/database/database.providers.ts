import { DataSource } from 'typeorm';
import DatabaseLogger from './logger';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.TYPEORM_HOST || 'localhost',
        port: parseInt(process.env.TYPEORM_PORT) || 3306,
        username: process.env.TYPEORM_USER || 'root',
        password: process.env.TYPEORM_PASS || '',
        database: process.env.TYPEORM_DB || 'yoga',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.TYPEORM_SYNC === 'true',
        debug: process.env.TYPEORM_DEBUG === 'true',
        logging: process.env.TYPEORM_LOGS === 'true',
        logger: new DatabaseLogger(),
      });

      return dataSource.initialize();
    },
  },
];
