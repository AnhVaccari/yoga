import { Pose } from 'src/poses/entities/pose.entity';
import { Session } from 'src/session/entities/session.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'difficulty' })
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  difficulty_level: string;

  @OneToMany(() => Session, (session: Session) => session.difficulty)
  sessions: Session[];

  @OneToMany(() => Pose, (pose: Pose) => pose.difficulty)
  poses: Pose[];
}
