import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Session } from '../../session/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Launched_Session' })
export class LaunchedSession {
  @ApiProperty({
    format: 'date-time',
    description: 'Start date of the launched session',
  })
  @PrimaryColumn({ type: 'datetime' })
  start_date: Date;

  @ApiProperty({
    format: 'date-time',
    description: 'End date of the launched session',
  })
  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  // Clé étrangère vers l'entité User
  @ApiProperty({
    type: () => User,
    description: 'User who launched the session',
  })
  @ManyToOne(() => User, (user: User) => user.launchedSession)
  user: User;

  // Clé étrangère vers l'entité Session
  @ApiProperty({
    type: () => Session,
    description: 'Session launched',
  })
  @ManyToOne(() => Session, (session: Session) => session.launchedSession, {
    eager: true,
  })
  session: Session;
}
