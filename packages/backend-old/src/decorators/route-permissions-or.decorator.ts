import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { PermissionName } from '../modules/database/enums/permission-name';

export const ROUTE_METADATA_KEY_PERMISSIONS_OR =
  'ROUTE_METADATA_KEY_PERMISSIONS_OR';
export const RoutePermissionsOr = (
  firstPermission: PermissionName,
  ...permissions: readonly PermissionName[]
): CustomDecorator =>
  SetMetadata(ROUTE_METADATA_KEY_PERMISSIONS_OR, [
    firstPermission,
    ...permissions,
  ]);
