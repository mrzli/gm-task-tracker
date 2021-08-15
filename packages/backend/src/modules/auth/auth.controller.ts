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
import { User as DbUser } from '@prisma/client';
import { ConfigService } from '../config/config.service';
import { ENV_DEVELOPMENT } from '../config/constants';
import { AUTH_COOKIE_NAME } from './constants';
import { RoutePublic } from '../app/route-any-public.decorator';

@Controller({ path: 'auth' })
export class AuthController {
  public constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @RoutePublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<DbUser> {
    const user = getUser(request);
    const authToken = await this.authService.createAuthToken(user);
    response.cookie(AUTH_COOKIE_NAME, authToken.token, {
      secure: this.configService.getAppEnv().NODE_ENV !== ENV_DEVELOPMENT,
      httpOnly: true,
      expires: authToken.expirationDate,
    });

    return user;
  }
}

function getUser(req: Request): DbUser {
  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user as DbUser;
}
