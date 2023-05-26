import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementSeedService } from './seeds/achievement.seed.service';
import { AchievementResolver } from './achievement.resolver';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import { ClearAchievementDbService } from 'src/database/clear-achievement-database.service';
import { AchievementConditionService } from 'src/achievement-condition/achievement-condition.service';
import { AchievementCondition } from 'src/achievement-condition/entities/achievement-condition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement, YogaPose, AchievementCondition]),
  ],
  providers: [
    AchievementService,
    AchievementResolver,
    YogaPoseService,
    AchievementConditionService,
    AchievementSeedService,
    ClearAchievementDbService,
  ],
})
export class AchievementModule {}
