import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { PermissionName } from '../database/enums/permission-name';

export const ROUTE_METADATA_KEY_ANY_PERMISSIONS =
  'ROUTE_METADATA_KEY_ANY_PERMISSIONS';
export const RouteAnyPermissions = (
  firstPermission: PermissionName,
  ...permissions: readonly PermissionName[]
): CustomDecorator =>
  SetMetadata(ROUTE_METADATA_KEY_ANY_PERMISSIONS, [
    firstPermission,
    ...permissions,
  ]);
