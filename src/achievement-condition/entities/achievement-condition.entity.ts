import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Achievement,
  PoseExecutionCount,
} from 'src/achievement/entities/achievement.entity';
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
export class AchievementCondition {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  achievementConditionId: number;

  @Column()
  @Field()
  pose: string;

  @ManyToMany(() => YogaPose, (yogaPose) => yogaPose.achievementConditions)
  @Field(() => YogaPose)
  yogaPose: PoseExecutionCount[];

  @Column()
  @Field()
  executionCount: number;

  @ManyToOne(() => Achievement, (achievement) => achievement.poseExecutionCount)
  @Field(() => Achievement)
  achievement: Achievement;
}
