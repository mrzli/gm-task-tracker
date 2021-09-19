import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getAppEnv } from '../../setup/app-env';
import { identifyFn } from '@mrzli/gm-js-libraries-utilities/function';
import { createLocationWrapper } from '@mrzli/gm-js-libraries-navigation-utils';
import { createLocalStorageWrapper } from '@mrzli/gm-js-libraries-browser-utils';
import { LocalStorageKey } from '../../browser/local-storage-key';

const restApi = axios.create({
  baseURL: getAppEnv().REACT_APP_REST_API_URL,
});

const localStorageWrapper = createLocalStorageWrapper();
const locationWrapper = createLocationWrapper();

restApi.interceptors.request.use(async (request) => {
  request.headers[LocalStorageKey.AuthToken] = localStorageWrapper.get(
    LocalStorageKey.AuthToken
  );
  return request;
});

restApi.interceptors.response.use(identifyFn, (error) => {
  if (error.response.status === StatusCodes.UNAUTHORIZED) {
    locationWrapper.setPathname('/login');
  }

  return Promise.reject(error);
});

export { restApi };
