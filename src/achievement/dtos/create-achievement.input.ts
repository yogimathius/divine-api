import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAchievementInput {
  @Field()
  achievementId: string;

  @Field()
  achievementName: string;

  @Field(() => Int)
  achievementPoints: number;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @ArrayNotEmpty()
  // @Type(() => ConditionInput)
  // @Field(() => [ConditionInput])
  // conditions: ConditionInput[];
}
