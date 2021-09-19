import React, { useEffect } from 'react';
import { ROUTE_DATA } from '../../app/routing/route-data';
import { useNavigate } from 'react-router-dom';
import { useActiveRoute } from '../../hooks/active-route';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectAuthData } from '../../app/store/auth-slice';
import { LoadingOverlay } from '../shared/display/LoadingOverlay';
import { emptyFn } from '@mrzli/gm-js-libraries-utilities/function';

export function ScreenRoutes() {
  const navigate = useNavigate();
  const activeRoute = useActiveRoute(ROUTE_DATA);

  const authData = useSelector(selectAuthData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (!activeRoute) {
      navigate('/');
    }
  }, [navigate, activeRoute]);

  if (authData.isLoading) {
    return <LoadingOverlay onClose={emptyFn} isOpen={true} />;
  }

  return activeRoute.element;
}
