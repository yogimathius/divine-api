import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAchievementInput {
  @Field()
  achievementName: string;

  @Field()
  achievementDate: string;

  @Field(() => Int)
  achievementPoints: number;

  @Field(() => [PoseExecutionCountInput])
  @ValidateNested({ each: true })
  @Type(() => PoseExecutionCountInput)
  poseExecutionCounts: PoseExecutionCountInput[];
}

@InputType()
class PoseExecutionCountInput {
  @Field()
  pose: string;

  @Field(() => Int)
  executionCount: number;

  @Field(() => ID)
  achievementId: number;
}
