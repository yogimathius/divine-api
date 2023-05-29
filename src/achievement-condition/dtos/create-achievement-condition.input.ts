import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';

@InputType()
export class CreateAchievementConditionInput {
  @Field(() => String)
  poseName: string;

  @Field(() => Int)
  executionCount: number;

  @Field(() => String)
  achievementName: string;
}
