import { getAppEnv } from './app-env';

// TODO GM: like this until I need it
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppGlobals {}

export function createAppGlobals(): AppGlobals {
  // TODO GM: like this until I need it
  const env = getAppEnv(); // eslint-disable-line @typescript-eslint/no-unused-vars
  return {};
}
