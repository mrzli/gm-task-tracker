import React from 'react';
import { AppContext } from './app-context';
import { Provider } from 'react-redux';
import { wrapWithTheme } from './create-app-theme';

export function wrapComponent(component, appContextData, store, theme) {
  const themeWrappedComponent = wrapWithTheme(component, theme);

  return (
    <AppContext.Provider value={appContextData}>
      <Provider store={store}>{themeWrappedComponent}</Provider>
    </AppContext.Provider>
  );
}
