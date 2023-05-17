import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { YogaPose } from '../../yoga-pose/entities/yoga-pose.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class UserYogaPose {
  @PrimaryGeneratedColumn()
  @Field()
  user_pose_id: number;

  @ManyToOne(() => User, (user) => user.userYogaPoses)
  @Field(() => User)
  user: User;

  @ManyToOne(() => YogaPose, (yogaPose) => yogaPose.userYogaPoses)
  @Field(() => YogaPose)
  pose: YogaPose;

  @Column()
  @Field()
  completion_date: Date;
}
