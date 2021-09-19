import { combineEpics } from 'redux-observable';
import {
  actionAuthRegisterFulfilled,
  actionAuthRegisterPending,
  actionAuthRegisterRejected,
  actionAuthLoginFulfilled,
  actionAuthLoginPending,
  actionAuthLoginRejected,
  actionAuthLogoutFulfilled,
  actionAuthLogoutPending,
  actionAuthLogoutRejected,
} from './auth-actions';
import { AppActionType } from '../base/app-action-type';
import { apiRequestHandler } from '../base/epic-utils';
import { LocalStorageKey } from '../../browser/local-storage-key';

const epicAuthRegister = (action$, state$, dependencies) => {
  return action$.pipe(
    apiRequestHandler({
      actionType: AppActionType.AuthRegister,
      actionPending: actionAuthRegisterPending,
      apiMethod: dependencies.api.auth.register,
      actionFulfilled: actionAuthRegisterFulfilled,
      actionRejected: actionAuthRegisterRejected,
      state$,
      dependencies,
    })
  );
};

const epicAuthLogin = (action$, state$, dependencies) => {
  return action$.pipe(
    apiRequestHandler({
      actionType: AppActionType.AuthLogin,
      actionPending: actionAuthLoginPending,
      apiMethod: dependencies.api.auth.login,
      actionFulfilled: (data, _payload, _state$, dependencies) => {
        dependencies.localStorageWrapper.set(
          LocalStorageKey.AuthToken,
          data.token
        );
        return actionAuthLoginFulfilled(data.user);
      },
      actionRejected: actionAuthLoginRejected,
      state$,
      dependencies,
    })
  );
};

const epicAuthLogout = (action$, state$, dependencies) => {
  return action$.pipe(
    apiRequestHandler({
      actionType: AppActionType.AuthLogout,
      actionPending: actionAuthLogoutPending,
      apiMethod: dependencies.api.auth.logout,
      actionFulfilled: actionAuthLogoutFulfilled,
      actionRejected: actionAuthLogoutRejected,
      state$,
      dependencies,
    })
  );
};

export function createAuthEpic() {
  const epicList = [epicAuthRegister, epicAuthLogin, epicAuthLogout];
  return combineEpics(...epicList);
}
