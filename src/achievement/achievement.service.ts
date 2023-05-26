import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementInput } from './dtos/create-achievement.input';
import { UpdateAchievementInput } from './dtos/update-achievement.input';
import { AchievementCondition } from 'src/achievement-condition/entities/achievement-condition.entity';

@Injectable()
export class AchievementService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(AchievementCondition)
    private readonly achievementConditionRepository: Repository<AchievementCondition>,
  ) {
    this.logger = new Logger('achievement service');
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async findById(id: number): Promise<Achievement> {
    return this.achievementRepository.findOneBy({ achievementId: id });
  }

  async create(achievementInput: CreateAchievementInput): Promise<Achievement> {
    const { achievementCondition, ...achievementData } = achievementInput;

    const achievement = this.achievementRepository.create(achievementData);
    const createdAchievement = await this.achievementRepository.save(
      achievement,
    );

    const achievementConditionEntities = achievementCondition.map(
      (poseCount) => {
        const achievementConditionEntity =
          this.achievementConditionRepository.create({
            ...poseCount,
            achievement: createdAchievement,
          });
        return achievementConditionEntity;
      },
    );

    await this.achievementConditionRepository.save(
      achievementConditionEntities,
    );

    return createdAchievement;
  }

  async update(
    id: number,
    achievement_data: UpdateAchievementInput,
  ): Promise<Achievement> {
    await this.achievementRepository.update(id, achievement_data);
    return this.achievementRepository.findOneBy({ achievementId: id });
  }

  async delete(id: number): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
