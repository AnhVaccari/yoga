import { DataSource } from 'typeorm';
import { Difficulty } from '../../entity/difficulty.entity';

export const difficultyProviders = [
  {
    provide: 'DIFFICULTY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Difficulty),
    inject: ['DATA_SOURCE'],
  },
];
