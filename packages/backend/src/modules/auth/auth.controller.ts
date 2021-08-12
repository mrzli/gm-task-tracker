import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller({ path: 'auth' })
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request): Promise<any> {
    const user = req.user;
    return user;
  }
}
