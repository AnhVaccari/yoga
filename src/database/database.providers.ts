import { DataSource } from 'typeorm';
import DatabaseLogger from './logger';
import { Difficulty } from 'src/difficulties/entities/difficulty.entity';

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
        entities: [Difficulty],
        synchronize: Boolean(process.env.TYPEORM_SYNC) || false,
        debug: Boolean(process.env.TYPEORM_DEBUG) || false,
        logging: Boolean(process.env.TYPEORM_LOGS) || false,
        logger: new DatabaseLogger(),
      });

      return dataSource.initialize();
    },
  },
];
