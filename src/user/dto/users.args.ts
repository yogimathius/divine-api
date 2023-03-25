import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UsersArgs {
  @Field(() => Int)
  page?: number = 1;

  @Field(() => Int)
  limit?: number = 10;
}
