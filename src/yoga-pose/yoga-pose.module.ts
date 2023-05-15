import { Module } from '@nestjs/common';
import { YogaPoseService } from './yoga-pose.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseSeedService } from './seeds/yoga-pose.seed.service';
import { ClearDbService } from '../database/clear-database.service';
import { YogaPoseResolver } from './yoga-pose.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([YogaPose])],
  providers: [
    YogaPoseService,
    YogaPoseResolver,
    YogaPoseSeedService,
    ClearDbService,
  ],
})
export class YogaPoseModule {}
