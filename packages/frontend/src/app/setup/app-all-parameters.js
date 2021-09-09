import { createAppContextData } from './app-context';
import { createAppStore } from './create-app-store';
import { createAppTheme } from './create-app-theme';

export function createAppAllParameters(dependencies, globals, initialAppState) {
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
