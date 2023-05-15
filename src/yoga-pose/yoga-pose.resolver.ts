import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
    @Args('id', { type: () => Int }) id: number,
  ): Promise<YogaPose> {
    return this.yogaPoseService.findById(id);
  }

  @Mutation(() => YogaPose)
  async createYogaPose(
    @Args('createYogaPoseInput') createYogaPoseInput: CreateYogaPoseInput,
  ): Promise<YogaPose> {
    return this.yogaPoseService.create(createYogaPoseInput);
  }

  @Mutation(() => YogaPose)
  updateYogaPose(
    @Args('id') id: number,
    @Args('input') input: UpdateYogaPoseInput,
  ) {
    return this.yogaPoseService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteYogaPose(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.yogaPoseService.delete(id);
    return true;
  }
}
