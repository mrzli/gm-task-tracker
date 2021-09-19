import { useEffect } from 'react';
import { ROUTE_DATA } from '../../app/routing/route-data';
import { useNavigate } from 'react-router-dom';
import { useActiveRoute } from '../../hooks/active-route';

export function ScreenRoutes() {
  const navigate = useNavigate();
  const activeRoute = useActiveRoute(ROUTE_DATA);

  useEffect(() => {
    if (!activeRoute) {
      navigate('/');
    }
  }, [navigate, activeRoute]);

  return activeRoute.element;
}
