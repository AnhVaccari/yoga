import { DataSource } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';

export const difficultiesProviders = [
  {
    provide: 'DIFFICULTIES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Difficulty),
    inject: ['DATA_SOURCE'],
  },
];
