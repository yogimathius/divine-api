import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
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

  @Column({ unique: true })
  @Field()
  achievementName: string;

  @Column()
  @Field()
  achievementPoints: number;

  @Field(() => Condition)
  @OneToMany(() => Condition, (condition) => condition.achievement)
  @JoinTable()
  conditions: Condition[];
}
