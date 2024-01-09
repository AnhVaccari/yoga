import { Difficulty } from 'src/difficulties/entities/difficulty.entity';
import { LaunchedSession } from 'src/launched_session/entities/launched_session.entity';
import { Pose } from 'src/poses/entities/pose.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @ManyToMany(() => User, (user: User) => user.sessions, {
    eager: false,
    cascade: true,
  })
  @JoinTable({ name: 'launched_session' })
  users: User[];

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
  start_date: Date;
}
