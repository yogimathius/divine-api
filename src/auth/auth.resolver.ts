import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthPayload, User } from '../user/entities/user.entity';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { Request } from 'express';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload, { name: 'register' })
  register(@Args('input') signupCredentialsDto: SignupCredentialsDto) {
    const { username, password } = signupCredentialsDto;
    const logger = new Logger('sign in controller');

    logger.verbose(
      `auth register hit with ${JSON.stringify({ username, password })}`,
    );
    return this.authService.signUp(username, password);
  }

  @Mutation(() => AuthPayload, { name: 'login' })
  login(@Args('input') authCredentialsDto: AuthCredentialsDto) {
    const logger = new Logger('sign in controller');

    logger.verbose(
      `user sign in hit with ${JSON.stringify(authCredentialsDto)}`,
    );
    return this.authService.signIn(authCredentialsDto);
  }

  // @Query('refreshToken')
  // @UseGuards(JwtAuthGuard)
  // async refreshToken(@Context('req') request: any): Promise<string> {
  //   const user: User = request.user;
  //   if (!user)
  //     throw new AuthenticationError(
  //       'Could not log-in with the provided credentials',
  //     );
  //   const result = await this.authService.createJwt(user);
  //   if (result) return result.token;
  //   throw new AuthenticationError(
  //     'Could not log-in with the provided credentials',
  //   );
  // }
}
