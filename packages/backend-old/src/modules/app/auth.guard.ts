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
import { ROUTE_METADATA_KEY_PERMISSIONS_OR } from '../../decorators/route-permissions-or.decorator';
import { ROUTE_METADATA_KEY_PUBLIC } from '../../decorators/route-public.decorator';
import { Request } from 'express';
import { Permission } from '@prisma/client';
import { ROUTE_METADATA_KEY_ANY_AUTHENTICATED } from '../../decorators/route-any-authenticated.decorator';
import { User } from '@mrzli/gm-task-tracker-dtos';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const routePermissions = this.reflector.getAllAndOverride<
      readonly PermissionName[] | undefined
    >(ROUTE_METADATA_KEY_PERMISSIONS_OR, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (routePermissions) {
      return isMatchPermissions(request, routePermissions, this.userService);
    }

    const routeAnyAuthenticated = this.reflector.getAllAndOverride<
      boolean | undefined
    >(ROUTE_METADATA_KEY_ANY_AUTHENTICATED, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (routeAnyAuthenticated) {
      return isAuthenticated(request, this.userService);
    }

    // if there are is no above route metadata specified, we still require explicit 'public route' decorator
    const routeIsPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      ROUTE_METADATA_KEY_PUBLIC,
      [context.getHandler(), context.getClass()]
    );

    return routeIsPublic ?? false;
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

  const authToken = getAuthToken(request);
  if (!authToken) {
    return false;
  }

  const user: User | undefined = await userService.findUserByToken(authToken);
  if (!user) {
    return false;
  }

  setUserToRequest(request, user);

  const userPermissions: readonly Permission[] =
    await userService.findPermissionsByUserId(user.id);
  const userPermissionNames: readonly PermissionName[] = userPermissions.map(
    (p) => p.name as PermissionName
  );
  const userPermissionSet = new Set<PermissionName>(userPermissionNames);

  return routePermissions.some((rp) => userPermissionSet.has(rp));
}

async function isAuthenticated(
  request: Request,
  userService: UserService
): Promise<boolean> {
  const authToken = getAuthToken(request);
  if (!authToken) {
    return false;
  }

  const user: User | undefined = await userService.findUserByToken(authToken);
  if (!user) {
    return false;
  }

  setUserToRequest(request, user);

  return true;
}

function getAuthToken(request: Request): string | undefined {
  return request.cookies[AUTH_COOKIE_NAME];
}

function setUserToRequest(request: Request, user: User): void {
  request.user = user;
}
