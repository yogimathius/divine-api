import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConditionInput } from './condition.input';

@InputType()
export class CreateAchievementInput {
  @Field()
  achievementName: string;

  @Field()
  achievementDate: string;

  @Field(() => Int)
  achievementPoints: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => ConditionInput)
  @Field(() => [ConditionInput])
  conditions: ConditionInput[];
}
