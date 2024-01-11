import { LaunchedSession } from 'src/launched_session/entities/launched_session.entity';
import { SessionCustom } from 'src/session_custom/entities/session_custom.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
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
  )
  sessionCustoms: SessionCustom[];

  @OneToMany(
    () => LaunchedSession,
    (launchedSession: LaunchedSession) => launchedSession.user,
    { eager: true },
  )
  launchedSession: LaunchedSession[];
}
