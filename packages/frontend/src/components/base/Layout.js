import React, { useCallback, useContext } from 'react';
import { AppBar, Box, Drawer, Toolbar } from '@mui/material';
import { ScreenRoutes } from './ScreenRoutes';
import { MainMenu } from './MainMenu';
import { Header } from './Header';
import { AppContext } from '../../app/setup/app-context';
import { useActiveRoute } from '../../hooks/active-route';
import { ROUTE_DATA } from '../../app/routing/route-data';

const MAIN_MENU_WIDTH = 200;

export function Layout() {
  const context = useContext(AppContext);
  const location = context.dependencies.locationWrapper;
  const activeRoute = useActiveRoute(location, ROUTE_DATA);

  const onNavigate = useCallback(
    (url) => {
      location.setPathname(url);
    },
    [location]
  );

  const menuWidth = activeRoute.showMenu ? MAIN_MENU_WIDTH : 0;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${menuWidth}px)`,
          ml: `${menuWidth}px`,
        }}
      >
        <Header />
      </AppBar>
      {activeRoute.showMenu && (
        <Drawer
          sx={{
            width: MAIN_MENU_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: MAIN_MENU_WIDTH,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <MainMenu onNavigate={onNavigate} />
        </Drawer>
      )}
      <Box sx={{ flexGrow: 1, p: 1 }} component={'main'}>
        <Toolbar />
        <ScreenRoutes />
      </Box>
    </Box>
  );
}
