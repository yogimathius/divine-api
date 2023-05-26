import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';
import { YogaPose } from '../yoga-pose/entities/yoga-pose.entity';
import { UserYogaPoseService } from 'src/user-yoga-pose/user-yoga-pose.service';
import { UserYogaPose } from 'src/user-yoga-pose/entities/user-yoga-pose.entity';
import { YogaPoseService } from 'src/yoga-pose/yoga-pose.service';
import { AchievementService } from 'src/achievement/achievement.service';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { AchievementConditionService } from 'src/achievement-condition/achievement-condition.service';
import { AchievementCondition } from 'src/achievement-condition/entities/achievement-condition.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'yogimathius', // set the username here
        password: 'password',
        database: 'divine_api',
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      YogaPose,
      UserYogaPose,
      Achievement,
      AchievementCondition,
    ]),
  ],
  providers: [
    UserRepository,
    UserService,
    UserYogaPoseService,
    YogaPoseService,
    AchievementService,
    AchievementConditionService,
  ],
})
export class DatabaseModule {}
