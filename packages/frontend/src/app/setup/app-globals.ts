import { getAppEnv } from './app-env';

export interface AppGlobals {}

export function createAppGlobals(): AppGlobals {
  const env = getAppEnv();
  return {};
}
