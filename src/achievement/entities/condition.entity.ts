import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

// AchievementCondition entity
@ObjectType()
@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Condition, (condition) => condition.yogaPose)
  @Field(() => YogaPose)
  yogaPose: YogaPose;

  @Column()
  @Field()
  executionCount: number;

  @ManyToOne(() => Condition, (condition) => condition.achievement)
  achievement: Achievement;
}
