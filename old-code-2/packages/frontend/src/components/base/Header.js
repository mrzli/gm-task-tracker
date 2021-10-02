import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { useActiveRoute } from '../../hooks/active-route';
import { ROUTE_DATA } from '../../app/routing/route-data';

export function Header() {
  const activeRoute = useActiveRoute(ROUTE_DATA);

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
