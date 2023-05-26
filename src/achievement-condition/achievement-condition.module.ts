import { Module } from '@nestjs/common';
import { AchievementConditionService } from './achievement-condition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementCondition } from './entities/achievement-condition.entity';
// import { AchievementConditionSeedService } from './seeds/achievement-condition.seed.service';
import { AchievementConditionResolver } from './achievement-condition.resolver';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import { ClearAchievementDbService } from 'src/database/clear-achievement-database.service';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementCondition, YogaPose])],
  providers: [
    AchievementConditionService,
    AchievementConditionResolver,
    YogaPoseService,
    // AchievementConditionSeedService,
    ClearAchievementDbService,
  ],
})
export class AchievementModule {}
