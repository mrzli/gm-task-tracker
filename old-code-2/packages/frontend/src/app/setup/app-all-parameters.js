import { createAppContextData } from './app-context';
import { createAppStore } from './app-store';
import { createAppTheme } from './app-theme';

export function createAppAllParameters(dependencies, globals) {
  const appContextData = createAppContextData(dependencies, globals);
  const store = createAppStore(dependencies);
  const theme = createAppTheme();

  return {
    dependencies,
    appContextData,
    store,
    theme,
  };
}
