import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class SessionCustom {
  @PrimaryGeneratedColumn()
  session_custom_id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @ManyToOne(() => User, (user) => user.sessionCustom)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
