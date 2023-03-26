import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    };
  }

  // getJwtOptions(): JwtModuleOptions {
  //   return {
  //     secret: this.configService.get<string>('JWT_SECRET'),
  //     signOptions: {
  //       expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
  //     },
  //   };
  // }
}
