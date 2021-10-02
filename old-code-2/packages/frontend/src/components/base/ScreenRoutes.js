import { ROUTE_DATA } from '../../app/routing/route-data';
import { useActiveRoute } from '../../hooks/active-route';

export function ScreenRoutes() {
  const activeRoute = useActiveRoute(ROUTE_DATA);
  return activeRoute.element;
}
