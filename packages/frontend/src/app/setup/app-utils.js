import React from 'react';
import { AppContext } from './app-context';
import { Provider } from 'react-redux';
import { wrapWithTheme } from './app-theme';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

export function wrapComponent(
  component,
  appContextData,
  store,
  theme,
  testRouteData
) {
  const themeWrappedComponent = wrapWithTheme(component, theme);

  return (
    <AppContext.Provider value={appContextData}>
      <Provider store={store}>
        {wrapWithRouter(themeWrappedComponent, testRouteData)}
      </Provider>
    </AppContext.Provider>
  );
}

function wrapWithRouter(component, testRouteData) {
  if (testRouteData !== undefined) {
    return (
      <MemoryRouter
        initialEntries={testRouteData.initialEntries}
        initialIndex={testRouteData.initialIndex}
      >
        {component}
      </MemoryRouter>
    );
  } else {
    return <BrowserRouter>{component}</BrowserRouter>;
  }
}
