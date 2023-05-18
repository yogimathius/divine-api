import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserYogaPoseInput {
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  poseId: number;

  @Field()
  completionDate: Date;
}
