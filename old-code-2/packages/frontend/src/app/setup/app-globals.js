import { getAppEnv } from './app-env';

export function createAppGlobals() {
  const env = getAppEnv();
  return { env };
}
