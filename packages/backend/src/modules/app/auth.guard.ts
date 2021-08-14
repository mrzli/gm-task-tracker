import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AUTH_COOKIE_NAME } from '../auth/constants';
import { PermissionName } from '../database/enums/permission-name';
import { UserService } from '../user/user.service';
import { Reflector } from '@nestjs/core';
import { ROUTE_METADATA_KEY_ANY_PERMISSIONS } from './route-permissions.decorator';
import { ROUTE_METADATA_KEY_PUBLIC } from './route-any-public.decorator';
import { Request } from 'express';
import { Permission } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePermissions = this.reflector.getAllAndOverride<
      readonly PermissionName[] | undefined
    >(ROUTE_METADATA_KEY_ANY_PERMISSIONS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!routePermissions) {
      // if there are no permissions specified, we still require explicit 'public route' decorator
      const routeIsPublic = this.reflector.getAllAndOverride<
        boolean | undefined
      >(ROUTE_METADATA_KEY_PUBLIC, [context.getHandler(), context.getClass()]);

      return routeIsPublic ?? false;
    }

    return isMatchPermissions(
      context.switchToHttp().getRequest(),
      routePermissions,
      this.userService
    );
  }
}

async function isMatchPermissions(
  request: Request,
  routePermissions: readonly PermissionName[],
  userService: UserService
): Promise<boolean> {
  if (routePermissions.length === 0) {
    throw new InternalServerErrorException(
      'Route permissions decorator needs to have at least 1 permission set.'
    );
  }

  const authToken: string | undefined = request.cookies[AUTH_COOKIE_NAME];
  if (!authToken) {
    return false;
  }

  const userPermissions: readonly Permission[] =
    await userService.findPermissionsByToken(authToken);
  const userPermissionNames: readonly PermissionName[] = userPermissions.map(
    (p) => p.name as PermissionName
  );
  const userPermissionSet = new Set<PermissionName>(userPermissionNames);

  return routePermissions.some((rp) => userPermissionSet.has(rp));
}
