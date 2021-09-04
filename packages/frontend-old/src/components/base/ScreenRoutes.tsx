import React, { useContext } from 'react';
import { ROUTE_DATA } from '../../app/routing/route-data';
import { AppContext } from '../../app/setup/app-context';
import { useActiveRoute } from '../../hooks/active-route';

export function ScreenRoutes(): React.ReactElement {
  const context = useContext(AppContext);
  const location = context.dependencies.locationWrapper;
  const activeRoute = useActiveRoute(location, ROUTE_DATA);

  if (!activeRoute) {
    location.setPathname('');
    return <div />;
  }

  return <div>{activeRoute.element}</div>;
}
