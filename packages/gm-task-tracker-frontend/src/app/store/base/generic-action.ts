import { AppActionBase } from './app-action-base';
import { AppActionType } from './app-action-type';

export type AppActionGenericNoop = AppActionBase<
  typeof AppActionType.GenericNoop
>;

export function actionGenericNoop(): AppActionGenericNoop {
  return { type: AppActionType.GenericNoop, payload: undefined };
}

export type AppActionGeneric = AppActionGenericNoop;
