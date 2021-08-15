import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const ParamUser = createParamDecorator<unknown, ExecutionContext, User>(
  (data, context) => {
    const request: Request = context.switchToHttp().getRequest();
    return getUserFromRequest(request);
  }
);

function getUserFromRequest(req: Request): User {
  if (!req.user) {
    throw new UnauthorizedException();
  }
  return req.user as User;
}
