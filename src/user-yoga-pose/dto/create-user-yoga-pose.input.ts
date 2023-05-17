import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserYogaPoseInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  poseId: number;

  @Field()
  completionDate: Date;
}
