import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthToken, User as DbUser } from '@prisma/client';
import { RegisterRequestData, User } from '@mrzli/gm-task-tracker-dtos';
import { CookieOptions, Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { ENV_DEVELOPMENT } from '../config/constants';
import { AUTH_COOKIE_NAME } from './constants';
import { RoutePublic } from '../../decorators/route-public.decorator';
import { objectOmitFields } from '@mrzli/gm-js-libraries-utilities/object';
import { RouteAnyAuthenticated } from '../../decorators/route-any-authenticated.decorator';
import { ParamUser } from '../../decorators/param-user.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { registerRequestDataValidationSchema } from '../../utils/validators/auth/register-request-data-validation-schema';
import { RoleName } from '../database/enums/role-name';

@Controller({ path: 'auth' })
export class AuthController {
  public constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @RoutePublic()
  @Post('register')
  public async register(
    @Body(new ZodValidationPipe(registerRequestDataValidationSchema))
    data: RegisterRequestData
  ): Promise<User> {
    const user = await this.authService.registerUser(data, [RoleName.USER]);
    return dbUserToDtosUser(user);
  }

  @RoutePublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Res({ passthrough: true }) response: Response,
    @ParamUser() user: DbUser
  ): Promise<User> {
    const authToken = await this.authService.createAuthToken(user);
    response.cookie(
      AUTH_COOKIE_NAME,
      authToken.token,
      getAuthCookieOptions(this.configService, authToken)
    );

    return dbUserToDtosUser(user);
  }

  @RouteAnyAuthenticated()
  @Post('logout')
  public async logout(
    @Res({ passthrough: true }) response: Response,
    @ParamUser() user: DbUser
  ): Promise<void> {
    response.clearCookie(
      AUTH_COOKIE_NAME,
      getAuthCookieOptions(this.configService, undefined)
    );
    await this.authService.deleteAccessTokensForUser(user);
  }
}

function getAuthCookieOptions(
  configService: ConfigService,
  authToken: AuthToken | undefined
): CookieOptions {
  return {
    secure: configService.getAppEnv().NODE_ENV !== ENV_DEVELOPMENT,
    httpOnly: true,
    expires: authToken?.expirationDate,
  };
}

function dbUserToDtosUser(user: DbUser): User {
  return objectOmitFields(user, ['password']);
}
