import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseService } from './yoga-pose.service';

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
    @Args('data') data: Partial<YogaPose>,
  ): Promise<YogaPose> {
    return this.yogaPoseService.create(data);
  }

  @Mutation(() => YogaPose)
  async updateYogaPose(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: Partial<YogaPose>,
  ): Promise<YogaPose> {
    return this.yogaPoseService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteYogaPose(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.yogaPoseService.delete(id);
    return true;
  }
}
