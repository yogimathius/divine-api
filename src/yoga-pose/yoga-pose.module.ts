import { Module } from '@nestjs/common';
import { YogaPoseService } from './yoga-pose.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YogaPose } from './entities/yoga-pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YogaPose])],
  providers: [YogaPoseService],
})
export class YogaPoseModule {}
