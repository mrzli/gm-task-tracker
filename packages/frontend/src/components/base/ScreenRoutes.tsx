import React, { useContext } from 'react';
import { ROUTE_DATA, RouteItem } from '../../app/routing/route-data';
import { AppContext } from '../../app/setup/app-context';
import {
  isRouteMatch,
  LocationWrapper,
} from '@mrzli/gm-js-libraries-navigation-utils';

export function ScreenRoutes(): React.ReactElement {
  const context = useContext(AppContext);
  const location = context.dependencies.locationWrapper;

  const activeRoute = getActiveRoute(location, ROUTE_DATA);
  console.log(activeRoute);
  if (!activeRoute) {
    location.setPathname('');
    return <div />;
  }

  return <div>{activeRoute.element}</div>;
}

function getActiveRoute(
  location: LocationWrapper,
  routeItems: readonly RouteItem[]
): RouteItem | undefined {
  return routeItems.find((item) =>
    isRouteMatch(location.getPathname(), item.url, item.exact)
  );
}
