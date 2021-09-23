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
import { NotificationRenderer } from '../shared/notifications/NotificationRenderer';

const MAIN_MENU_WIDTH = 200;

export function Layout() {
  useNavigateToHomeIfInvalidUrl();
  useFetchUser();
  const isLoading = useIsLoading();
  const showMenu = useShowMenu();
  const onNavigate = useMenuNavigate();

  if (isLoading) {
    return <LoadingOverlay onClose={emptyFn} isOpen={true} />;
  }

  const menuWidth = showMenu ? MAIN_MENU_WIDTH : 0;

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
      {showMenu && (
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
      <NotificationRenderer />
    </Box>
  );
}

function useFetchUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
}

function useIsLoading() {
  const activeRoute = useActiveRoute(ROUTE_DATA);
  const authData = useSelector(selectAuthData);

  return (
    !activeRoute ||
    authData.isLoading ||
    (!authData.user && activeRoute.isProtected)
  );
}

function useShowMenu() {
  const activeRoute = useActiveRoute(ROUTE_DATA);
  return activeRoute && activeRoute.showMenu;
}

function useMenuNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (url) => {
      navigate(url);
    },
    [navigate]
  );
}

function useNavigateToHomeIfInvalidUrl() {
  const activeRoute = useActiveRoute(ROUTE_DATA);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeRoute) {
      navigate('/');
    }
  }, [navigate, activeRoute]);
}
