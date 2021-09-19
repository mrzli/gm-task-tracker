import React, { useCallback, useEffect } from 'react';
import { AppBar, Box, Drawer, Toolbar } from '@mui/material';
import { ScreenRoutes } from './ScreenRoutes';
import { MainMenu } from './MainMenu';
import { Header } from './Header';
import { useActiveRoute } from '../../hooks/active-route';
import { ROUTE_DATA } from '../../app/routing/route-data';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectAuthData } from '../../app/store/auth-slice';
import { LoadingOverlay } from '../shared/display/LoadingOverlay';
import { emptyFn } from '@mrzli/gm-js-libraries-utilities/function';

const MAIN_MENU_WIDTH = 200;

export function Layout() {
  const navigate = useNavigate();
  const activeRoute = useActiveRoute(ROUTE_DATA);

  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!activeRoute) {
      navigate('/');
    }
  }, [navigate, activeRoute]);

  const onNavigate = useCallback(
    (url) => {
      navigate(url);
    },
    [navigate]
  );

  if (
    !activeRoute ||
    authData.isLoading ||
    (!authData.user && activeRoute.isProtected)
  ) {
    return <LoadingOverlay onClose={emptyFn} isOpen={true} />;
  }

  const menuWidth = showMenu(activeRoute) ? MAIN_MENU_WIDTH : 0;

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
      {showMenu(activeRoute) && (
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

function showMenu(activeRoute) {
  return activeRoute && activeRoute.showMenu;
}
