import React from 'react';
import { TaskMainView } from '../../components/task/TaskMainView';

const EXPLICIT_ROUTES = [
  {
    label: 'Tasks',
    url: '/tasks',
    exact: false,
    element: <TaskMainView />,
  },
];

const DEFAULT_ROUTE_INDEX = 0;

export const ROUTE_DATA = [
  {
    ...EXPLICIT_ROUTES[DEFAULT_ROUTE_INDEX],
    label: 'Home',
    url: '/',
    exact: true,
  },
  ...EXPLICIT_ROUTES,
];
