import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserYogaPose } from '../../user-yoga-pose/entities/user-yoga-pose.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class YogaPose {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  poseId: number;

  @Column({ unique: true })
  @Field()
  poseName: string;

  @Column('text')
  @Field()
  poseDescription: string;

  @Column()
  @Field()
  poseImagePath: string;

  @Column()
  @Field()
  posePoints: number;

  @OneToMany(() => UserYogaPose, (userYogaPose) => userYogaPose.pose)
  userYogaPoses: UserYogaPose[];
}
