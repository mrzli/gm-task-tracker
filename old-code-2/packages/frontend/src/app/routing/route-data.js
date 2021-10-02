import React from 'react';
import { TaskMainView } from '../../components/domain/task/TaskMainView';
import { LoginMainView } from '../../components/auth/LoginMainView';
import { RegisterMainView } from '../../components/auth/RegisterMainView';

const EXPLICIT_ROUTES = [
  {
    label: 'Login',
    url: '/login',
    exact: false,
    element: <LoginMainView />,
    hasMenuItem: false,
    showMenu: false,
    isProtected: false,
  },
  {
    label: 'Register',
    url: '/register',
    exact: false,
    element: <RegisterMainView />,
    hasMenuItem: false,
    showMenu: false,
    isProtected: false,
  },
  {
    label: 'Tasks',
    url: '/tasks',
    exact: false,
    element: <TaskMainView />,
    hasMenuItem: true,
    showMenu: true,
    isProtected: true,
  },
];

const DEFAULT_ROUTE_INDEX = 2;

export const ROUTE_DATA = [
  {
    ...EXPLICIT_ROUTES[DEFAULT_ROUTE_INDEX],
    label: 'Home',
    url: '/',
    exact: true,
    hasMenuItem: false,
    showMenu: true,
  },
  ...EXPLICIT_ROUTES,
];
