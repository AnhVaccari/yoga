import { Pose } from 'src/poses/entities/pose.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
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
    eager: true,
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
