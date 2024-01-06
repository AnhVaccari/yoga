import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Session } from 'src/session/entities/session.entity';

@Entity({ name: 'launched_session' })
export class LaunchedSession {
  @PrimaryColumn({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  // Clé étrangère vers l'entité User
  @ManyToOne(() => User, (user: User) => user.launchedSession)
  user: User;

  // Clé étrangère vers l'entité Session
  @ManyToOne(() => Session, (session: Session) => session.launchedSession)
  session: Session;
}
