import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Pose {
  @PrimaryGeneratedColumn()
  pose_id: number;

  @Column({ length: 500 })
  sanskrit_name: string;

  @Column({ length: 500 })
  english_name: string;

  @Column('text')
  description: string;

  @Column({ length: 500 })
  benefits: string;

  @Column('text')
  img_url_svg: string;

  @Column('text')
  img_url_jpg: string;

  @Column('text')
  img_url_svg_alt: string;

  @Column('int')
  difficulty_id: number;
}
