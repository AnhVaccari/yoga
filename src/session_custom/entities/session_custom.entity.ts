import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionCustom {
  @PrimaryGeneratedColumn()
  session_custom_id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @Column('int')
  user_id: number;
}
