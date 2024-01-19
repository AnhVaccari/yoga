import { Pose } from '../../poses/entities/pose.entity';
import { Session } from '../../session/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'difficulty' })
export class Difficulty {
  @ApiProperty({
    type: 'number',
    description: 'Difficulty ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Difficulty level',
  })
  @Column({ length: 500 })
  difficulty_level: string;

  @ApiProperty({
    type: () => [Session],
    description: 'Sessions',
  })
  @OneToMany(() => Session, (session: Session) => session.difficulty)
  sessions: Session[];

  @ApiProperty({
    type: () => [Pose],
    description: 'Poses',
  })
  @OneToMany(() => Pose, (pose: Pose) => pose.difficulty)
  poses: Pose[];
}
