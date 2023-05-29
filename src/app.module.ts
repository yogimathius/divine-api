import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { YogaPoseModule } from './yoga-pose/yoga-pose.module';
import { UserYogaPoseModule } from './user-yoga-pose/user-yoga-pose.module';
import { AchievementModule } from './achievement/achievement.module';
import { AchievementConditionModule } from './achievement-condition/achievement-condition.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'schema.gql',
      }),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    YogaPoseModule,
    UserYogaPoseModule,
    AchievementModule,
    AchievementConditionModule,
  ],
})
export class AppModule {}
