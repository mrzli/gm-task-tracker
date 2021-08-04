import { Action } from 'redux';
import { AppActionType } from './app-action-type';

export interface AppActionBase<
  T extends AppActionType = AppActionType,
  P = undefined
> extends Action<T> {
  readonly type: T;
  readonly payload: P;
}
