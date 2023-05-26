import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateAchievementConditionInput {
  @Field()
  pose: string;

  @Field(() => Int)
  executionCount: number;

  @Field(() => ID)
  achievementId: number;
}
