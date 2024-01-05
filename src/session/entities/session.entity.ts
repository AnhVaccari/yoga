import { Difficulty } from 'src/difficulties/entities/difficulty.entity';
import { Pose } from 'src/poses/entities/pose.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
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
  @JoinTable({ name: 'LaunchedSessions' })
  users: User[];

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
  @JoinTable({ name: 'SessionPoses' })
  poses: Pose[];
}
