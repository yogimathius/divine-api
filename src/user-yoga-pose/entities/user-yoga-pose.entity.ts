import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { YogaPose } from '../../yoga-pose/entities/yoga-pose.entity';

@Entity()
export class UserYogaPose {
  @PrimaryGeneratedColumn()
  user_pose_id: number;

  @ManyToOne(() => User, (user) => user.userYogaPoses)
  user: User;

  @ManyToOne(() => YogaPose, (yogaPose) => yogaPose.userYogaPoses)
  pose: YogaPose;

  @Column()
  completion_date: Date;
}
