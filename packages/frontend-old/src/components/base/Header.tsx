import React, { useContext } from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { useActiveRoute } from '../../hooks/active-route';
import { AppContext } from '../../app/setup/app-context';
import { ROUTE_DATA } from '../../app/routing/route-data';

export function Header(): React.ReactElement {
  const context = useContext(AppContext);
  const activeRoute = useActiveRoute(
    context.dependencies.locationWrapper,
    ROUTE_DATA
  );

  if (!activeRoute) {
    return <div />;
  }

  return (
    <header>
      <Toolbar>
        <Typography variant={'h6'}>{activeRoute.label}</Typography>
      </Toolbar>
    </header>
  );
}
