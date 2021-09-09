import { AppActionType } from './app-action-type';

export function actionGenericNoop() {
  return { type: AppActionType.GenericNoop, payload: undefined };
}
