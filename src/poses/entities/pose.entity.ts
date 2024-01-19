import { Category } from '../../categories/entities/category.entity';
import { Difficulty } from '../../difficulties/entities/difficulty.entity';
import { Session } from '../../session/entities/session.entity';
import { SessionCustom } from '../../session_custom/entities/session_custom.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'pose' })
export class Pose {
  @ApiProperty({
    type: 'number',
    description: 'Pose ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'Sanskrit name',
  })
  @Column({ length: 500 })
  sanskrit_name: string;

  @ApiProperty({
    type: 'string',
    description: 'English name',
  })
  @Column({ length: 500 })
  english_name: string;

  @ApiProperty({
    type: 'string',
    description: 'Pose description',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'Pose benefits',
  })
  @Column({ length: 500 })
  benefits: string;

  @ApiProperty({
    type: 'string',
    description: 'Pose image url svg',
  })
  @Column('text')
  img_url_svg: string;

  @ApiProperty({
    type: 'string',
    description: 'Pose image url jpg',
  })
  @Column('text')
  img_url_jpg: string;

  @ApiProperty({
    type: 'string',
    description: 'Pose image url alt',
  })
  @Column('text')
  img_url_svg_alt: string;

  @ApiProperty({
    type: () => [Session],
    description: 'All sessions that contain this pose',
  })
  @ManyToMany(() => Session, (session: Session) => session.poses)
  @JoinTable({ name: 'session_pose' })
  sessions: Session[];

  @ApiProperty({
    type: () => [Category],
    description: 'All categories that contain this pose',
  })
  @ManyToMany(() => Category, (category: Category) => category.poses)
  @JoinTable({ name: 'pose_category' })
  categories: Category[];

  @ApiProperty({
    type: () => Difficulty,
    description: 'Difficulty of this pose',
  })
  @ManyToOne(() => Difficulty, (difficulty: Difficulty) => difficulty.poses)
  difficulty: Difficulty;

  @ApiProperty({
    type: () => [SessionCustom],
    description: 'All session_customs that contain this pose',
  })
  @ManyToMany(
    () => SessionCustom,
    (sessionCustom: SessionCustom) => sessionCustom.poses,
    {
      eager: false,
    },
  )
  @JoinTable({
    name: 'sessionCustom_pose',
  })
  sessionCustoms: SessionCustom[];
}
