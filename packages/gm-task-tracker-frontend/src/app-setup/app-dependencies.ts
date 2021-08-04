import { AppApi, createAppApi } from '../api/backend/base/app';
import { LocalStorageKey } from '../api/browser/local-storage-key';
import {
  CookieWrapper,
  createCookieWrapper,
  createLocalStorageWrapper,
  createSessionStorageWrapper,
  StorageWrapper,
} from '@mrzli/gm-js-libraries-browser-utils';
import { CookieKey } from '../api/browser/cookie-key';
import { SessionStorageKey } from '../api/browser/session-storage-key';

export interface AppDependencies {
  readonly api: AppApi;
  // readonly windowWrapper: WindowWrapper;
  readonly sessionStorageWrapper: StorageWrapper<SessionStorageKey>;
  readonly localStorageWrapper: StorageWrapper<LocalStorageKey>;
  readonly cookieWrapper: CookieWrapper<CookieKey>;
}

export function createAppDependencies(): AppDependencies {
  return {
    api: createAppApi(),
    // windowWrapper: createWindowWrapper(),
    sessionStorageWrapper: createSessionStorageWrapper<SessionStorageKey>(),
    localStorageWrapper: createLocalStorageWrapper<LocalStorageKey>(),
    cookieWrapper: createCookieWrapper<CookieKey>(),
  };
}
