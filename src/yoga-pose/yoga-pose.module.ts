import { Module } from '@nestjs/common';
import { YogaPoseService } from './yoga-pose.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseSeedService } from './seeds/yoga-poses.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([YogaPose])],
  providers: [YogaPoseService, YogaPoseSeedService],
})
export class YogaPoseModule {}
