import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @Column()
  @Field()
  executionCount: number;

  @ManyToOne(() => Achievement, (achievement) => achievement.poseExecutionCount)
  @Field(() => Achievement)
  achievement: Achievement;
}
