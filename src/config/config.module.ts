import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt.config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
