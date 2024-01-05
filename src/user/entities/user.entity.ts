import { Session } from 'src/session/entities/session.entity';
import { SessionCustom } from 'src/session_custom/entities/session_custom.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_joined: Date;

  @OneToMany(
    () => SessionCustom,
    (sessionCustom: SessionCustom) => sessionCustom.user,
    { eager: true, cascade: true },
  )
  sessionCustoms: SessionCustom[];

  @ManyToMany(() => Session, (session: Session) => session.users, {
    eager: true,
  })
  @JoinTable({ name: 'LaunchedSessions' })
  sessions: Session[];
}
