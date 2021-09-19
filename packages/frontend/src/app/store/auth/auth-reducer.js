import { AppActionType } from '../base/app-action-type';
import { createInitialAuthState } from './auth-state';

export function authReducer(state = createInitialAuthState(), action) {
  switch (action.type) {
    case AppActionType.AuthRegisterPending:
      return {
        ...state,
        isLoading: true,
      };

    case AppActionType.AuthRegisterFulfilled:
      return {
        ...state,
        isLoading: false,
      };

    case AppActionType.AuthRegisterRejected:
      return {
        ...state,
        isLoading: false,
      };

    case AppActionType.AuthLoginPending:
      return {
        ...state,
        isLoading: true,
      };

    case AppActionType.AuthLoginFulfilled:
      return {
        ...state,
        isLoading: false,
        redirectToHome: true,
        user: action.payload,
      };

    case AppActionType.AuthLoginRejected:
      return {
        ...state,
        isLoading: false,
      };

    case AppActionType.AuthLogoutPending:
      return {
        ...state,
        isLoading: true,
      };

    case AppActionType.AuthLogoutFulfilled:
      return {
        ...state,
        isLoading: false,
      };

    case AppActionType.AuthLogoutRejected:
      return {
        ...state,
        isLoading: false,
      };

    case AppActionType.AuthClearRedirectToHome:
      return {
        ...state,
        redirectToHome: false,
      };

    default:
      return state;
  }
}
