import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementSeedService } from './seeds/achievement.seed.service';
import { AchievementResolver } from './achievement.resolver';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import { ClearAchievementDbService } from 'src/database/clear-achievement-database.service';
import { Condition } from './entities/condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement, YogaPose, Condition])],
  providers: [
    AchievementService,
    AchievementResolver,
    YogaPoseService,
    AchievementSeedService,
    ClearAchievementDbService,
  ],
})
export class AchievementModule {}
