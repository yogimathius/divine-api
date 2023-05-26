import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AchievementCondition } from './entities/achievement-condition.entity';
import { CreateAchievementConditionInput } from './dtos/create-achievement-condition.input';
import { UpdateAchievementConditionInput } from './dtos/update-achievement-condition.input';
import { AchievementConditionService } from './achievement-condition.service';

@Resolver(() => AchievementCondition)
export class AchievementConditionResolver {
  constructor(
    private readonly achievementConditionService: AchievementConditionService,
  ) {}

  @Query(() => [AchievementCondition])
  async achievements(): Promise<AchievementCondition[]> {
    return this.achievementConditionService.findAll();
  }

  @Query(() => AchievementCondition)
  async achievement(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<AchievementCondition> {
    return this.achievementConditionService.findById(id);
  }

  @Mutation(() => AchievementCondition)
  async createAchievementCondition(
    @Args('createAchievementConditionInput')
    createAchievementConditionInput: CreateAchievementConditionInput,
  ): Promise<AchievementCondition> {
    return this.achievementConditionService.create(
      createAchievementConditionInput,
    );
  }

  @Mutation(() => AchievementCondition)
  updateAchievementCondition(
    @Args('id') id: number,
    @Args('input') input: UpdateAchievementConditionInput,
  ) {
    return this.achievementConditionService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteAchievementCondition(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.achievementConditionService.delete(id);
    return true;
  }
}
