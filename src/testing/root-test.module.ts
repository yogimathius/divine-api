import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { YogaPoseModule } from '../yoga-pose/yoga-pose.module';
import { YogaPose } from '../yoga-pose/entities/yoga-pose.entity';
import { UserYogaPoseModule } from '../user-yoga-pose/user-yoga-pose.module';
import { UserYogaPose } from '../user-yoga-pose/entities/user-yoga-pose.entity';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'schema.gql',
      }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'yogimathius',
        password: 'password',
        database: 'divine_api',
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, YogaPose, UserYogaPose]),
    UserModule,
    DatabaseModule,
    YogaPoseModule,
    UserYogaPoseModule,
  ],
  providers: [UserRepository, UserService, Logger],
})
export class RootTestModule {}
