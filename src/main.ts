import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { YogaPoseSeedService } from './yoga-pose/seeds/yoga-pose.seed.service';
import { ClearDbService } from './database/clear-database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Clear the database
  // const clearDbService = app.get(ClearDbService);
  // await clearDbService.clearAllData();

  const yogaPoseSeedService = app.get(YogaPoseSeedService);
  // await yogaPoseSeedService.seed();

  await app.listen(3000);
}
bootstrap();
