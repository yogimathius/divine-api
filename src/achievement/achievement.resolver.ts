import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Achievement } from './entities/achievement.entity';
import { AchievementService } from './achievement.service';
import { CreateAchievementInput } from './dtos/create-achievement.input';
import { UpdateAchievementInput } from './dtos/update-achievement.input';

@Resolver(() => Achievement)
export class AchievementResolver {
  constructor(private readonly achievementService: AchievementService) {}

  @Query(() => [Achievement])
  async achievements(): Promise<Achievement[]> {
    return this.achievementService.findAll();
  }

  @Query(() => Achievement)
  async achievement(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Achievement> {
    return this.achievementService.findById(id);
  }

  @Mutation(() => Achievement)
  async createAchievement(
    @Args('createAchievementInput')
    createAchievementInput: CreateAchievementInput,
  ): Promise<Achievement> {
    return this.achievementService.create(createAchievementInput);
  }

  @Mutation(() => Achievement)
  updateAchievement(
    @Args('id') id: string,
    @Args('input') input: UpdateAchievementInput,
  ) {
    return this.achievementService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteAchievement(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    await this.achievementService.delete(id);
    return true;
  }
}
