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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'session' })
export class Session {
  @ApiProperty({
    type: 'number',
    description: 'Session unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Session title',
  })
  @Column({ length: 500 })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Session description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    type: 'number',
    description: 'Session duration in minutes',
  })
  @Column('int')
  duration: number;

  @ApiProperty({
    type: () => [LaunchedSession],
    description: 'Session launched sessions',
  })
  @OneToMany(
    () => LaunchedSession,
    (launchedSession: LaunchedSession) => launchedSession.session,
  )
  launchedSession: LaunchedSession[];

  @ApiProperty({
    type: () => Difficulty,
    description: 'Session difficulty',
  })
  @ManyToOne(
    () => Difficulty,
    (difficulty: Difficulty) => difficulty.sessions,
    { eager: true, cascade: true },
  )
  difficulty: Difficulty;

  @ApiProperty({
    type: () => [Pose],
    description: 'Session poses',
  })
  @ManyToMany(() => Pose, (pose: Pose) => pose.sessions, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'session_pose' })
  poses: Pose[];
}
