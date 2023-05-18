import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserYogaPoseService } from './user-yoga-pose.service';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { CreateUserYogaPoseInput } from './dto/create-user-yoga-pose.input';

@Resolver(() => UserYogaPose)
export class UserYogaPoseResolver {
  constructor(private readonly userYogaPoseService: UserYogaPoseService) {}

  @Mutation(() => UserYogaPose)
  async createUserYogaPose(
    @Args('createUserYogaPoseInput')
    createUserYogaPoseInput: CreateUserYogaPoseInput,
  ): Promise<UserYogaPose> {
    const { userId, poseId, completionDate } = createUserYogaPoseInput;
    return this.userYogaPoseService.createUserYogaPose({
      userId,
      poseId,
      completionDate,
    });
  }

  @Query(() => [UserYogaPose])
  async userYogaPoses(
    @Args('userId', { type: () => ID }) userId: number,
  ): Promise<UserYogaPose[]> {
    return this.userYogaPoseService.findUserYogaPoses(userId);
  }

  @Mutation(() => Boolean)
  async deleteUserYogaPose(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    await this.userYogaPoseService.deleteUserYogaPose(id);
    return true;
  }
}
