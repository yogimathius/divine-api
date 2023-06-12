import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ConditionInput {
  @Field(() => ID)
  @IsString()
  poseId: string;

  @Field(() => Int)
  executionCount: number;

  @Field(() => ID)
  @IsString()
  achievementId: string;
}
