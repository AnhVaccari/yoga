import { SessionCustom } from 'src/session_custom/entities/session_custom.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  email: string;

  @Column('text')
  password: string;

  @Column('timestamp')
  date_joined: Date;

  @OneToMany(() => SessionCustom, (sessionCustom) => sessionCustom.user)
  sessionCustom: SessionCustom[];
}
