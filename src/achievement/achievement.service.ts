import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementInput } from './dtos/create-achievement.input';
import { UpdateAchievementInput } from './dtos/update-achievement.input';

@Injectable()
export class AchievementService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {
    this.logger = new Logger('achievement service');
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async findById(id: string): Promise<Achievement> {
    return this.achievementRepository.findOneBy({ achievementId: id });
  }

  async create(achievementInput: CreateAchievementInput): Promise<Achievement> {
    const achievement = this.achievementRepository.create(achievementInput);
    const createdAchievement = await this.achievementRepository.save(
      achievement,
    );

    // const achievementConditionEntities = achievementConditions.map(
    //   (achievementConditionid) => {
    //     const achievementConditionEntity =
    //       this.achievementConditionRepository.create(achievementConditionid);
    //     return achievementConditionEntity;
    //   },
    // );

    // await this.achievementConditionRepository.save(
    //   achievementConditionEntities,
    // );

    return createdAchievement;
  }

  async update(
    id: string,
    achievementInput: UpdateAchievementInput,
  ): Promise<Achievement> {
    await this.achievementRepository.update(id, achievementInput);
    return this.achievementRepository.findOneBy({ achievementId: id });
  }

  async delete(id: string): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
