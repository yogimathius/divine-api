import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AchievementCondition } from 'src/achievement-condition/entities/achievement-condition.entity';

@InputType()
export class CreateAchievementInput {
  @Field()
  achievementName: string;

  @Field()
  achievementDate: string;

  @Field(() => Int)
  achievementPoints: number;
}
