import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { RoutePublic } from './route-any-public.decorator';
import { RouteAnyPermissions } from './route-permissions.decorator';
import { PermissionName } from '../database/enums/permission-name';

@Controller({ path: 'app' })
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @RoutePublic()
  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @RouteAnyPermissions(PermissionName.USER)
  @Get('example-protected')
  public async getExampleProtected(@Req() request: Request): Promise<string> {
    return 'example-protected';
  }
}
