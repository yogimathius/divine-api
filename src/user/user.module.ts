import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ClearUserDbService } from '../database/clear-user-database.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, ClearUserDbService],
})
export class UserModule {}
