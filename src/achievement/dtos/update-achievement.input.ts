import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { CreateAchievementInput } from './create-achievement.input';

@InputType()
export class UpdateAchievementInput extends PartialType(
  CreateAchievementInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  achievementId: string;
}
