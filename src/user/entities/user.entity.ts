import { IsEmail } from 'class-validator';
import { LaunchedSession } from '../../launched_session/entities/launched_session.entity';
import { SessionCustom } from '../../session_custom/entities/session_custom.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column('text')
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    readonly: true,
  })
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
