import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }
}
