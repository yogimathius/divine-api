import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserYogaPoseService } from './user-yoga-pose.service';
import { UserYogaPoseResolver } from './user-yoga-pose.resolver';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserYogaPose, User, YogaPose])],
  providers: [
    UserService,
    UserYogaPoseService,
    YogaPoseService,
    UserYogaPoseResolver,
  ],
})
export class UserYogaPoseModule {}
