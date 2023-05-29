import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { YogaPoseSeedService } from './yoga-pose/seeds/yoga-pose.seed.service';
import { ClearDbService } from './database/clear-database.service';
import { ClearUserDbService } from './database/clear-user-database.service';
import { ClearUserYogaDbService } from './database/clear-user-yoga-pose-database.service';
import { AchievementSeedService } from './achievement/seeds/achievement.seed.service';
import { ClearAchievementDbService } from './database/clear-achievement-database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Clear the database

  const clearUserYogaDbService = app.get(ClearUserYogaDbService);
  // await clearUserYogaDbService.clearAllData();
  // await clearUserYogaDbService.clearAllData();
  const clearAchievementDbService = app.get(ClearAchievementDbService);
  await clearAchievementDbService.clearAllData();

  // const clearDbService = app.get(ClearUserDbService);
  // await clearDbService.clearAllData();
  // const yogaPoseSeedService = app.get(YogaPoseSeedService);
  // await yogaPoseSeedService.seed();
  const achievementSeedService = app.get(AchievementSeedService);
  await achievementSeedService.seed();
  await app.listen(3000);
}
bootstrap();
