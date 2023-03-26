import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../../user/entities/user.entity';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOneBy({ username });
    const logger = new Logger('sign in controller');
    console.log('validation being used???');

    if (!user) {
      logger.log(`user invalid: ${user}`);

      throw new UnauthorizedException();
    }
    logger.log(`user validated: ${JSON.stringify(user)}`);

    return user;
  }
}
