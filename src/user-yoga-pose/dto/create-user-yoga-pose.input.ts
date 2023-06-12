import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserYogaPoseInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  poseId: string;

  @Field()
  completionDate: Date;
}
