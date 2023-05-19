import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { YogaPoseSeedService } from './yoga-pose/seeds/yoga-pose.seed.service';
import { ClearDbService } from './database/clear-database.service';
import { ClearUserDbService } from './database/clear-user-database.service';
import { ClearUserYogaDbService } from './database/clear-user-yoga-pose-database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Clear the database

  const clearUserYogaDbService = app.get(ClearUserYogaDbService);
  await clearUserYogaDbService.clearAllData();

  // const clearDbService = app.get(ClearUserDbService);
  // await clearDbService.clearAllData();
  // const yogaPoseSeedService = app.get(YogaPoseSeedService);
  // await yogaPoseSeedService.seed();

  await app.listen(3000);
}
bootstrap();
