import {
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthToken, User } from '@prisma/client';
import { ConfigService } from '../config/config.service';
import { ENV_DEVELOPMENT } from '../config/constants';
import {
  AUTH_COOKIE_NAME,
  HTTP_HEADER_SET_COOKIE,
  SET_COOKIE_ATTRIBUTE_EXPIRES,
  SET_COOKIE_ATTRIBUTE_HTTP_ONLY,
  SET_COOKIE_ATTRIBUTE_SECURE,
} from './constants';
import { dateToHttpFormat } from '@mrzli/gm-js-libraries-utilities/date';

@Controller({ path: 'auth' })
export class AuthController {
  public constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const user = getUser(request);
    const authToken = await this.authService.createAuthToken(user);
    response.setHeader(
      HTTP_HEADER_SET_COOKIE,
      createAuthSetCookieHeader(
        authToken,
        this.configService.getAppEnv().NODE_ENV
      )
    );
    response.cookie(AUTH_COOKIE_NAME, authToken.token, {
      secure: this.configService.getAppEnv().NODE_ENV !== ENV_DEVELOPMENT,
      httpOnly: true,
      expires: authToken.expirationDate,
    });
  }
}

function getUser(req: Request): User {
  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user as User;
}

function createAuthSetCookieHeader(
  authToken: AuthToken,
  nodeEnv: string
): string {
  const cookieComponents: readonly string[] = [
    `${AUTH_COOKIE_NAME}=${authToken.token}`,
    SET_COOKIE_ATTRIBUTE_HTTP_ONLY,
    nodeEnv !== ENV_DEVELOPMENT ? SET_COOKIE_ATTRIBUTE_SECURE : '',
    `${SET_COOKIE_ATTRIBUTE_EXPIRES}=${dateToHttpFormat(
      authToken.expirationDate
    )}`,
  ].filter((component) => component !== '');
  return cookieComponents.join('; ');
}
