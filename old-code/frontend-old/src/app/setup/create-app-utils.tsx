import React from 'react';
import { AppContextData, AppContext } from './app-context';
import { Theme } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AppState } from '../store/base/app-state';
import { wrapWithTheme } from './create-app-theme';
import { AppAction } from '../store/base/app-action';

export function wrapComponent(
  component: React.ReactElement,
  appContextData: AppContextData,
  store: Store<AppState, AppAction>,
  theme: Theme
): React.ReactElement {
  const themeWrappedComponent = wrapWithTheme(component, theme);

  return (
    <AppContext.Provider value={appContextData}>
      <Provider store={store}>{themeWrappedComponent}</Provider>
    </AppContext.Provider>
  );
}
