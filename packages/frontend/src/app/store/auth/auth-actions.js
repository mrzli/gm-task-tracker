import { AppActionType } from '../base/app-action-type';

export function createAuthActions(dispatch) {
  return {
    register: (data) => dispatch(actionAuthRegister(data)),
    login: (data) => dispatch(actionAuthLogin(data)),
    logout: () => dispatch(actionAuthLogout()),
    clearRedirectToHome: () => dispatch(actionAuthClearRedirectToHome()),
  };
}

export function actionAuthRegister(payload) {
  return { type: AppActionType.AuthRegister, payload };
}

export function actionAuthRegisterPending() {
  return { type: AppActionType.AuthRegisterPending, payload: undefined };
}

export function actionAuthRegisterFulfilled(payload) {
  return { type: AppActionType.AuthRegisterFulfilled, payload };
}

export function actionAuthRegisterRejected() {
  return { type: AppActionType.AuthRegisterRejected, payload: undefined };
}

export function actionAuthLogin(payload) {
  return { type: AppActionType.AuthLogin, payload };
}

export function actionAuthLoginPending() {
  return { type: AppActionType.AuthLoginPending, payload: undefined };
}

export function actionAuthLoginFulfilled(payload) {
  return { type: AppActionType.AuthLoginFulfilled, payload };
}

export function actionAuthLoginRejected() {
  return { type: AppActionType.AuthLoginRejected, payload: undefined };
}

export function actionAuthLogout() {
  return { type: AppActionType.AuthLogout, payload: undefined };
}

export function actionAuthLogoutPending() {
  return { type: AppActionType.AuthLogoutPending, payload: undefined };
}

export function actionAuthLogoutFulfilled() {
  return { type: AppActionType.AuthLogoutFulfilled, payload: undefined };
}

export function actionAuthLogoutRejected() {
  return { type: AppActionType.AuthLogoutRejected, payload: undefined };
}

export function actionAuthClearRedirectToHome() {
  return { type: AppActionType.AuthClearRedirectToHome, payload: undefined };
}
