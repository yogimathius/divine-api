import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  async userYogaPoses(): Promise<UserYogaPose[]> {
    return this.userYogaPoseService.findAllUserYogaPoses();
  }

  @Mutation(() => Boolean)
  async deleteUserYogaPose(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.userYogaPoseService.deleteUserYogaPose(id);
    return true;
  }
}
