import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseService } from './yoga-pose.service';
import { CreateYogaPoseInput } from './dtos/create-yoga-pose.input';
import { UpdateYogaPoseInput } from './dtos/update-yoga-pose.input';

@Resolver(() => YogaPose)
export class YogaPoseResolver {
  constructor(private readonly yogaPoseService: YogaPoseService) {}

  @Query(() => [YogaPose])
  async yogaPoses(): Promise<YogaPose[]> {
    return this.yogaPoseService.findAll();
  }

  @Query(() => YogaPose)
  async yogaPose(
    @Args({ name: 'poseId', type: () => ID }) poseId: string,
  ): Promise<YogaPose> {
    return this.yogaPoseService.findById(poseId);
  }

  @Mutation(() => YogaPose)
  async createYogaPose(
    @Args('createYogaPoseInput') createYogaPoseInput: CreateYogaPoseInput,
  ): Promise<YogaPose> {
    return this.yogaPoseService.create(createYogaPoseInput);
  }

  @Mutation(() => YogaPose)
  updateYogaPose(
    @Args('id') id: string,
    @Args('input') input: UpdateYogaPoseInput,
  ) {
    return this.yogaPoseService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteYogaPose(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.yogaPoseService.delete(id);
    return true;
  }
}
