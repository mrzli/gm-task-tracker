import { isRouteMatch } from '@mrzli/gm-js-libraries-navigation-utils';
import { useMemo } from 'react';

export function useActiveRoute(location, routeItems) {
  const pathname = location.getPathname();
  return useMemo(() => {
    console.log('recalculating');
    return routeItems.find((item) =>
      isRouteMatch(pathname, item.url, item.exact)
    );
  }, [pathname, routeItems]);
}
