import React from 'react';
import { TaskMainView } from '../../components/task/TaskMainView';

export interface RouteItem {
  readonly label: string;
  readonly url: string;
  readonly exact: boolean;
  readonly element: React.ReactElement;
}

const EXPLICIT_ROUTES: readonly RouteItem[] = [
  {
    label: 'Tasks',
    url: '/tasks',
    exact: false,
    element: <TaskMainView />,
  },
];

const DEFAULT_ROUTE_INDEX = 0;

export const ROUTE_DATA: readonly RouteItem[] = [
  {
    ...(EXPLICIT_ROUTES[DEFAULT_ROUTE_INDEX] as RouteItem),
    url: '/',
    exact: true,
  },
  ...EXPLICIT_ROUTES,
];
