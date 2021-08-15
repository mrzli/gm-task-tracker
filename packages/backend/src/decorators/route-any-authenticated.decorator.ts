import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const ROUTE_METADATA_KEY_ANY_AUTHENTICATED =
  'ROUTE_METADATA_KEY_ANY_AUTHENTICATED';
export const RouteAnyAuthenticated = (): CustomDecorator =>
  SetMetadata(ROUTE_METADATA_KEY_ANY_AUTHENTICATED, true);
