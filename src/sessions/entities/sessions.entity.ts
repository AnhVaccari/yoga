import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn()
  sessions_id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @Column('int')
  difficulty_id: number;
}
