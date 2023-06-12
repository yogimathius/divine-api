import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../entities/achievement.entity';
import { achievementsSeed } from './achievement.seed';
import { conditionsSeed } from '../../condition/seeds/condition.seed';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { Condition } from '../..//condition/entities/condition.entity';

@Injectable()
export class AchievementSeedService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
    private readonly yogaPoseService: YogaPoseService,
  ) {
    this.logger = new Logger('achievement seed service');
  }

  async seed(): Promise<void> {
    for (const achievementSeed in achievementsSeed) {
      const achievement = this.achievementRepository.create(
        achievementsSeed[achievementSeed],
      );

      this.logger.verbose('adding new achievementSeed to db: ', achievement);
      const saved = await this.achievementRepository.save(
        achievementsSeed[achievementSeed],
      );

      this.logger.verbose('saved achievment: ', { saved });

      const conditions = conditionsSeed[achievementSeed];

      this.logger.verbose('found conditions: ', { conditions });
      for (const conditionSeed in conditions) {
        const conditionCreating = conditions[conditionSeed];
        this.logger.verbose('condition: ', {
          conditionCreating,
        });
        const condition = new Condition();
        this.logger.verbose('new condition Seed created: ', {
          condition,
        });
        condition.executionCount = conditionCreating.executionCount;
        this.logger.verbose('added execution count to condition', {
          condition,
        });

        condition.achievement = saved;
        this.logger.verbose('added achievement to condition', {
          condition,
        });

        const yogaPose = await this.yogaPoseService.findById(
          conditionCreating.poseId,
        );

        this.logger.verbose('found yoga pose: ', {
          yogaPose,
        });
        condition.yogaPose = yogaPose;
        this.logger.verbose('added yogapose to condition', {
          condition,
        });

        await this.conditionRepository.save(condition);
      }
    }
  }
}
