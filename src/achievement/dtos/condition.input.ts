import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class ConditionInput {
  @Field(() => ID)
  poseId: number;

  @Field(() => Int)
  executionCount: number;

  @Field(() => ID)
  achievementId: number;
}
