import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserYogaPose } from '../../user-yoga-pose/entities/user-yoga-pose.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Condition } from 'src/condition/entities/condition.entity';

@Entity()
@ObjectType()
export class YogaPose {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

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

  @OneToMany(() => Condition, (condition) => condition.yogaPose)
  conditions: Condition[];
}
