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
export class AchievementCondition {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  achievementConditionId: number;

  @ManyToMany(() => YogaPose, (yogaPose) => yogaPose.achievementConditions)
  @Field(() => YogaPose)
  yogaPose: YogaPose;

  @Column()
  @Field()
  executionCount: number;

  @ManyToOne(
    () => Achievement,
    (achievement) => achievement.achievementConditions,
  )
  @Field(() => Achievement)
  achievement: Achievement;
}
