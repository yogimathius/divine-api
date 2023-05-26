import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsInt } from 'class-validator';
import { CreateAchievementConditionInput } from './create-achievement-condition.input';

@InputType()
export class UpdateAchievementConditionInput extends PartialType(
  CreateAchievementConditionInput,
) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  achievementConditionId: number;
}
