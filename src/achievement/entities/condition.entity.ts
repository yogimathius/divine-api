import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

// AchievementCondition entity
@ObjectType()
@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Achievement, (achievement) => achievement.conditions)
  @JoinColumn({
    name: 'achievementName',
    referencedColumnName: 'achievementName',
  })
  achievement: Achievement;

  @ManyToOne(() => YogaPose, (yogaPose) => yogaPose.conditions)
  @JoinColumn({ name: 'poseName', referencedColumnName: 'poseName' })
  @Field(() => YogaPose)
  yogaPose: YogaPose;

  @Column()
  @Field()
  executionCount: number;
}
