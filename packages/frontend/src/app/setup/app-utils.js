import React from 'react';
import { AppContext } from './app-context';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

export function wrapComponent(
  component,
  appContextData,
  store,
  theme,
  testRouteData
) {
  return (
    <AppContext.Provider value={appContextData}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            {wrapWithRouter(component, testRouteData)}
          </SnackbarProvider>
        </ThemeProvider>
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
