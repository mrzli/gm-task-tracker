import { RouteItem } from '../app/routing/route-data';
import {
  isRouteMatch,
  LocationWrapper,
} from '@mrzli/gm-js-libraries-navigation-utils';
import { useMemo } from 'react';

export function useActiveRoute(
  location: LocationWrapper,
  routeItems: readonly RouteItem[]
): RouteItem | undefined {
  const pathname = location.getPathname();
  return useMemo(() => {
    console.log('recalculating');
    return routeItems.find((item) =>
      isRouteMatch(pathname, item.url, item.exact)
    );
  }, [pathname, routeItems]);
}
