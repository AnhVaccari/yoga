import { DataSource } from 'typeorm';
import { SessionCustom } from './entities/session_custom.entity';
import { Pose } from 'src/poses/entities/pose.entity';

export const sessionCustomProviders = [
  {
    provide: 'SESSION_CUSTOM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SessionCustom),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'POSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pose),
    inject: ['DATA_SOURCE'],
  },
];
