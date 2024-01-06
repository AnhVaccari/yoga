import { Pose } from 'src/poses/entities/pose.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  category_name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Pose, (pose: Pose) => pose.categories)
  @JoinTable({ name: 'pose_category' })
  poses: Pose[];
}
