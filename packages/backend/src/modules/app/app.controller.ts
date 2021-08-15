import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { RoutePublic } from '../../decorators/route-public.decorator';
import { RoutePermissionsOr } from '../../decorators/route-permissions-or.decorator';
import { PermissionName } from '../database/enums/permission-name';

@Controller({ path: 'app' })
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @RoutePublic()
  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @RoutePermissionsOr(PermissionName.USER)
  @Get('example-protected')
  public async getExampleProtected(@Req() request: Request): Promise<string> {
    return 'example-protected';
  }
}
