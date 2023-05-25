import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreateAchievementInput } from './create-achievement.input';

@InputType()
export class UpdateAchievementInput extends PartialType(
  CreateAchievementInput,
) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  achievementId: number;
}
