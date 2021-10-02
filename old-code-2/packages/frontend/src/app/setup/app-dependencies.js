import { createAppApi } from '../api/base/app';
import {
  createCookieWrapper,
  createLocalStorageWrapper,
  createSessionStorageWrapper,
} from '@mrzli/gm-js-libraries-browser-utils';
import {
  createHistoryWrapper,
  createLocationWrapper,
} from '@mrzli/gm-js-libraries-navigation-utils';

export function createAppDependencies() {
  return {
    api: createAppApi(),
    // windowWrapper: createWindowWrapper(),
    historyWrapper: createHistoryWrapper(),
    locationWrapper: createLocationWrapper(),
    sessionStorageWrapper: createSessionStorageWrapper(),
    localStorageWrapper: createLocalStorageWrapper(),
    cookieWrapper: createCookieWrapper(),
  };
}
