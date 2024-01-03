import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ length: 500 })
  category_name: string;

  @Column({ length: 500 })
  short_name: string;

  @Column('text')
  description: string;
}
