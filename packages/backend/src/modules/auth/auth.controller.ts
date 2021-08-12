import {
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthToken, User } from '@prisma/client';

@Controller({ path: 'auth' })
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request): Promise<AuthToken> {
    const user = getUser(req);
    const authToken = await this.authService.createAuthToken(user);
    return authToken;
  }
}

function getUser(req: Request): User {
  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user as User;
}
