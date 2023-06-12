import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { Condition } from '../../condition/entities/condition.entity';

// Achievement entity
@ObjectType()
@Entity()
export class Achievement {
  @PrimaryColumn()
  @Field(() => ID)
  achievementId: string;

  @Column({ unique: true })
  @Field()
  achievementName: string;

  @Column()
  @Field()
  achievementPoints: number;

  // @Field(() => Condition)
  @OneToMany(() => Condition, (condition) => condition.achievement)
  // @JoinTable()
  conditions: Condition[];
}
