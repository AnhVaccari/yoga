import { Category } from 'src/categories/entities/category.entity';
import { Difficulty } from 'src/difficulties/entities/difficulty.entity';
import { Session } from 'src/session/entities/session.entity';
import { SessionCustom } from 'src/session_custom/entities/session_custom.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
@Entity()
export class Pose {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => Session, (session: Session) => session.poses)
  @JoinTable({ name: 'SessionPoses' })
  sessions: Session[];

  @ManyToMany(() => Category, (category: Category) => category.poses)
  @JoinTable({ name: 'PoseCategories' })
  categories: Category[];

  @ManyToOne(() => Difficulty, (difficulty: Difficulty) => difficulty.poses)
  difficulty: Difficulty;

  @ManyToMany(
    () => SessionCustom,
    (sessionCustom: SessionCustom) => sessionCustom.poses,
    {
      eager: true,
    },
  )
  @JoinTable({ name: 'SessionCustomPoses' })
  sessionCustoms: SessionCustom[];
}
