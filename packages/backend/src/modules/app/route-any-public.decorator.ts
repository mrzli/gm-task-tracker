import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const ROUTE_METADATA_KEY_PUBLIC = 'ROUTE_METADATA_KEY_PUBLIC';
export const RoutePublic = (): CustomDecorator =>
  SetMetadata(ROUTE_METADATA_KEY_PUBLIC, true);
