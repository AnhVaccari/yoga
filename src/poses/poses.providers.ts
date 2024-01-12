import { DataSource } from 'typeorm';

import { Pose } from './entities/pose.entity';

export const posesProviders = [
  {
    provide: 'POSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pose),
    inject: ['DATA_SOURCE'],
  },
];
