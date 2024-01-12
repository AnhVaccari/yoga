import { Pose } from '../../poses/entities/pose.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  category_name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Pose, (pose: Pose) => pose.categories, {
    eager: true,
  })
  @JoinTable({ name: 'pose_category' })
  poses: Pose[];
}
