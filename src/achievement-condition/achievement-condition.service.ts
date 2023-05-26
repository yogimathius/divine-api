import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AchievementCondition } from './entities/achievement-condition.entity';
import { CreateAchievementConditionInput } from './dtos/create-achievement-condition.input';
import { UpdateAchievementConditionInput } from './dtos/update-achievement-condition.input';

@Injectable()
export class AchievementConditionService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(AchievementCondition)
    private readonly achievementRepository: Repository<AchievementCondition>,
  ) {
    this.logger = new Logger('achievement service');
  }

  async findAll(): Promise<AchievementCondition[]> {
    return this.achievementRepository.find();
  }

  async findById(id: number): Promise<AchievementCondition> {
    return this.achievementRepository.findOneBy({ achievementConditionId: id });
  }

  async create(
    achievementInput: CreateAchievementConditionInput,
  ): Promise<AchievementCondition> {
    const { ...achievementData } = achievementInput;

    const achievement = this.achievementRepository.create(achievementData);
    const createdAchievementCondition = await this.achievementRepository.save(
      achievement,
    );

    return createdAchievementCondition;
  }

  async update(
    id: number,
    achievement_data: UpdateAchievementConditionInput,
  ): Promise<AchievementCondition> {
    await this.achievementRepository.update(id, achievement_data);
    return this.achievementRepository.findOneBy({ achievementConditionId: id });
  }

  async delete(id: number): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
