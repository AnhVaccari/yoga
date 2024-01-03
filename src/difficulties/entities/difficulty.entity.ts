import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Difficulty {
  @PrimaryGeneratedColumn()
  difficulty_id: number;

  @Column({ length: 500 })
  difficulty_level: string;
}
