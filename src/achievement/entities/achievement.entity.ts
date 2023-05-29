import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AchievementCondition } from 'src/achievement-condition/entities/achievement-condition.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Condition } from './condition.entity';

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

  @Field(() => Condition)
  @OneToMany(() => Condition, (condition) => condition.achievement)
  @JoinTable()
  conditions: Condition[];
}
