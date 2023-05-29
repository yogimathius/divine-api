import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ConditionInput {
  @Field(() => String)
  poseName: string;

  @Field(() => Int)
  executionCount: number;

  @Field(() => String)
  achievementName: string;
}
