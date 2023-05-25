import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

// Achievement entity
@ObjectType()
@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  achievementId: number;

  @Column()
  @Field()
  achievementName: string;

  @Column()
  @Field()
  achievementDate: Date;

  @Column()
  @Field()
  achievementPoints: number;

  @OneToMany(
    () => PoseExecutionCount,
    (poseExecutionCount) => poseExecutionCount.achievement,
  )
  @Field(() => PoseExecutionCount)
  poseExecutionCount: PoseExecutionCount[];
}

// PoseExecutionCount entity
@ObjectType()
@Entity()
export class PoseExecutionCount {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  poseExecutionCountId: number;

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
