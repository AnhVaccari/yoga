import { Pose } from '../../poses/entities/pose.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'category' })
export class Category {
  @ApiProperty({
    type: 'number',
    description: 'Category ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Category name',
  })
  @Column({ length: 500 })
  category_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Category description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    type: () => [Pose],
    description: 'Category poses',
  })
  @ManyToMany(() => Pose, (pose: Pose) => pose.categories, {
    eager: true,
  })
  @JoinTable({ name: 'pose_category' })
  poses: Pose[];
}
