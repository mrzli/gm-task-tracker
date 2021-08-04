import { Store } from 'redux';
import { Theme } from '@material-ui/core';
import { AppDependencies } from './app-dependencies';
import { AppContextData, createAppContextData } from './app-context';
import { AppState } from '../store/base/app-state';
import { createAppStore } from './create-app-store';
import { createAppTheme } from './create-app-theme';
import { AppGlobals } from './app-globals';
import { AppAction } from '../store/base/app-action';

export interface AppAllParameters {
  readonly dependencies: AppDependencies;
  readonly appContextData: AppContextData;
  readonly initialAppState: AppState;
  readonly store: Store<AppState, AppAction>;
  readonly theme: Theme;
}

export function createAppAllParameters(
  dependencies: AppDependencies,
  globals: AppGlobals,
  initialAppState: AppState
): AppAllParameters {
  const appContextData = createAppContextData(dependencies, globals);
  const store = createAppStore(dependencies, initialAppState);
  const theme = createAppTheme();

  return {
    dependencies,
    appContextData,
    initialAppState,
    store,
    theme,
  };
}
