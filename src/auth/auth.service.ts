import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const logger = new Logger();
    console.log('in service: ', username, password);
    return this.userService.create({ username, email, password });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; user: User; expiresIn: number }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userService.findUserSignIn(username);
    const logger = new Logger();

    if (user && (await bcrypt.compare(password, user.password))) {
      const expiresIn = 3600;
      const { token } = await this.createJwt(user);
      logger.log(`user access token: ${token}`);

      return { token, user, expiresIn };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserSignIn(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists and is enabled
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)} returns undefined if there is no user or the account is not enabled
   * @memberof AuthService
   */
  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.userService.findUserSignIn(payload.username);

    // Ensure the user exists and their account isn't disabled
    if (user && user.enabled) {
      // user.lastSeenAt = new Date();
      // user.save();
      return user;
    }

    return undefined;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
   * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
   * token created by signing the data.
   * @memberof AuthService
   */
  async createJwt(user: User): Promise<{ token: string; data: JwtPayload }> {
    const expiresIn = 3600; // set expiration time to 1 hour (3600 seconds)
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + expiresIn * 1000);

    const data: JwtPayload = {
      username: user.username,
      expiration,
    };

    const jwt = await this.jwtService.sign(data, {
      expiresIn: expiresIn,
      secret: jwtConstants.secret,
    });
    console.log(jwt);

    return {
      data,
      token: jwt,
    };
  }
}
