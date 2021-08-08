import { AppEnv, getAppEnv } from './app-env';

export interface AppGlobals {
  readonly env: AppEnv;
}

export function createAppGlobals(): AppGlobals {
  const env = getAppEnv();
  return { env };
}
