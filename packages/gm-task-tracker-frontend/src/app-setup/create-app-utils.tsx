import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppContextData, AppContext } from './app-context';
import { Theme } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AppState } from '../store/base/app-state';
import { wrapWithTheme } from './create-app-theme';

export function wrapComponent(
  component: React.ReactElement,
  appContextData: AppContextData,
  store: Store<AppState, any>,
  theme: Theme,
  useMemoryRouter: boolean,
  initialLocationForMemoryRouter: string
): React.ReactElement {
  const routerWrappedComponent = getRouterWrappedComponent(
    component,
    useMemoryRouter,
    initialLocationForMemoryRouter
  );

  const themeWrappedComponent = wrapWithTheme(routerWrappedComponent, theme);

  return (
    <AppContext.Provider value={appContextData}>
      <Provider store={store}>{themeWrappedComponent}</Provider>
    </AppContext.Provider>
  );
}

function getRouterWrappedComponent(
  component: React.ReactElement,
  isForTest: boolean,
  initialLocationForTest: string
): React.ReactElement {
  if (isForTest) {
    return (
      <MemoryRouter initialEntries={[initialLocationForTest]}>
        {component}
      </MemoryRouter>
    );
  } else {
    return <BrowserRouter>{component}</BrowserRouter>;
  }
}
