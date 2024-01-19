import { Pose } from '../../poses/entities/pose.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'session_custom' })
export class SessionCustom {
  @ApiProperty({
    type: 'number',
    description: 'SessionCustom unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'SessionCustom title',
  })
  @Column({ length: 500 })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'SessionCustom description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    type: 'number',
    description: 'SessionCustom duration in minutes',
  })
  @Column('int')
  duration: number;

  @ApiProperty({
    type: () => Object(User),
    description: 'SessionCustom user',
  })
  @ManyToOne(() => User, (user: User) => user.sessionCustoms, {
    eager: false,
  })
  user: User;

  @ApiProperty({
    type: () => [Pose],
    description: 'SessionCustom poses',
  })
  @ManyToMany(() => Pose, (pose: Pose) => pose.sessionCustoms, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'sessionCustom_pose',
  })
  poses: Pose[];
}
