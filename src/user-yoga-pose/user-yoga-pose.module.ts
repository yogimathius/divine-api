import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserYogaPoseService } from './user-yoga-pose.service';
import { UserYogaPoseResolver } from './user-yoga-pose.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserYogaPose])],
  providers: [UserYogaPoseService, UserYogaPoseResolver],
})
export class UserYogaPoseModule {}
