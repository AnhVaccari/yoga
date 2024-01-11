import { Category } from '../../categories/entities/category.entity';
import { Difficulty } from '../../difficulties/entities/difficulty.entity';
import { Session } from '../../session/entities/session.entity';
import { SessionCustom } from '../../session_custom/entities/session_custom.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
@Entity({ name: 'pose' })
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
  @JoinTable({ name: 'session_pose' })
  sessions: Session[];

  @ManyToMany(() => Category, (category: Category) => category.poses)
  @JoinTable({ name: 'pose_category' })
  categories: Category[];

  @ManyToOne(() => Difficulty, (difficulty: Difficulty) => difficulty.poses)
  difficulty: Difficulty;

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
