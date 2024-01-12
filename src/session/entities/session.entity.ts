import { Difficulty } from '../../difficulties/entities/difficulty.entity';
import { LaunchedSession } from '../../launched_session/entities/launched_session.entity';
import { Pose } from '../../poses/entities/pose.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'session' })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @OneToMany(
    () => LaunchedSession,
    (launchedSession: LaunchedSession) => launchedSession.session,
  )
  launchedSession: LaunchedSession[];

  @ManyToOne(
    () => Difficulty,
    (difficulty: Difficulty) => difficulty.sessions,
    { eager: true, cascade: true },
  )
  difficulty: Difficulty;

  @ManyToMany(() => Pose, (pose: Pose) => pose.sessions, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'session_pose' })
  poses: Pose[];
}
