import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AchievementCondition } from '../entities/achievement-condition.entity';
import { achievementConditionsSeed } from './achievement-condition.seed';

@Injectable()
export class AchievementConditionSeedService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(AchievementCondition)
    private readonly achievementRepository: Repository<AchievementCondition>,
  ) {
    this.logger = new Logger('achievement seed service');
  }

  async seed(): Promise<void> {
    for (const achievementConditionSeed of achievementConditionsSeed) {
      this.logger.verbose(
        'adding new achievementConditionSeed to db: ',
        achievementConditionSeed,
      );
      const achievement = this.achievementRepository.create(
        achievementConditionSeed,
      );
      this.logger.verbose('new achievementConditionSeed created: ', {
        achievement,
      });

      await this.achievementRepository.save(achievement);
    }
  }
}
