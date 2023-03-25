import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
