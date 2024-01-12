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

@Entity({ name: 'session_custom' })
export class SessionCustom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @ManyToOne(() => User, (user: User) => user.sessionCustoms, {
    eager: false,
  })
  user: User;

  @ManyToMany(() => Pose, (pose: Pose) => pose.sessionCustoms, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'sessionCustom_pose',
  })
  poses: Pose[];
}
