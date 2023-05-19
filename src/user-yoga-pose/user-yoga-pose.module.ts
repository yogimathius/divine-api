import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserYogaPoseService } from './user-yoga-pose.service';
import { UserYogaPoseResolver } from './user-yoga-pose.resolver';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { YogaPose } from 'src/yoga-pose/entities/yoga-pose.entity';
import { ClearUserYogaDbService } from 'src/database/clear-user-yoga-pose-database.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserYogaPose, User, YogaPose])],
  providers: [
    UserService,
    UserYogaPoseService,
    YogaPoseService,
    UserYogaPoseResolver,
    ClearUserYogaDbService,
  ],
})
export class UserYogaPoseModule {}
