import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../entities/achievement.entity';
import { achievementsSeed } from './achievement.seed';

@Injectable()
export class AchievementSeedService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {
    this.logger = new Logger('achievement seed service');
  }

  async seed(): Promise<void> {
    for (const achievementSeed in achievementsSeed) {
      this.logger.verbose(
        'adding new achievementSeed to db: ',
        achievementSeed,
      );
      const achievement = this.achievementRepository.create(
        achievementsSeed[achievementSeed],
      );
      this.logger.verbose('new achievementSeed created: ', { achievement });

      await this.achievementRepository.save(achievement);
    }
  }
}
