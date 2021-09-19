import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export function useActiveRoute(routeItems) {
  const { pathname } = useLocation();
  return useMemo(() => {
    return routeItems.find((item) =>
      matchPath({ path: item.url, exact: item.exact }, pathname)
    );
  }, [pathname, routeItems]);
}
