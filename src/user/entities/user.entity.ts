import { IsEmail } from 'class-validator';
import { LaunchedSession } from '../../launched_session/entities/launched_session.entity';
import { SessionCustom } from '../../session_custom/entities/session_custom.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User {
  @ApiProperty({
    type: 'number',
    description: 'Id of the user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Username of the user',
  })
  @Column({ length: 255, unique: true })
  username: string;

  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
  })
  @Column({ length: 255, unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password of the user',
  })
  @Column('text')
  password: string;

  @ApiProperty({
    format: 'date-time',
    description: 'Date_joined of the user',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    readonly: true,
  })
  date_joined: Date;

  @ApiProperty({
    type: () => [SessionCustom],
    description: 'Session custom of the user',
  })
  @OneToMany(
    () => SessionCustom,
    (sessionCustom: SessionCustom) => sessionCustom.user,
  )
  sessionCustoms: SessionCustom[];

  @ApiProperty({
    type: () => [LaunchedSession],
    description: 'Launched session of the user',
  })
  @OneToMany(
    () => LaunchedSession,
    (launchedSession: LaunchedSession) => launchedSession.user,
    { eager: true },
  )
  launchedSession: LaunchedSession[];
}
