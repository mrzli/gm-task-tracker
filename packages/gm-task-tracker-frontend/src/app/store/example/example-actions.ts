import { Dispatch } from 'redux';
import { AppActionType } from '../base/app-action-type';
import { AppActionBase } from '../base/app-action-base';

export interface ExampleActions {
  readonly getPieceOfInformation: () => void;
}

export function createExampleActions(
  dispatch: Dispatch<AppActionBase>
): ExampleActions {
  return {
    getPieceOfInformation: () => dispatch(actionExampleGetPieceOfInformation()),
  };
}

export type AppActionExampleGetPieceOfInformation = AppActionBase<
  typeof AppActionType.ExampleGetPieceOfInformation
>;

export function actionExampleGetPieceOfInformation(): AppActionExampleGetPieceOfInformation {
  return {
    type: AppActionType.ExampleGetPieceOfInformation,
    payload: undefined,
  };
}

export type AppActionExampleGetPieceOfInformationPending = AppActionBase<
  typeof AppActionType.ExampleGetPieceOfInformationPending
>;

export function actionExampleGetPieceOfInformationPending(): AppActionExampleGetPieceOfInformationPending {
  return {
    type: AppActionType.ExampleGetPieceOfInformationPending,
    payload: undefined,
  };
}

export type AppActionExampleGetPieceOfInformationFulfilled = AppActionBase<
  typeof AppActionType.ExampleGetPieceOfInformationFulfilled,
  string
>;

export function actionExampleGetPieceOfInformationFulfilled(
  payload: string
): AppActionExampleGetPieceOfInformationFulfilled {
  return { type: AppActionType.ExampleGetPieceOfInformationFulfilled, payload };
}

export type AppActionExampleGetPieceOfInformationRejected = AppActionBase<
  typeof AppActionType.ExampleGetPieceOfInformationRejected
>;

export function actionExampleGetPieceOfInformationRejected(): AppActionExampleGetPieceOfInformationRejected {
  return {
    type: AppActionType.ExampleGetPieceOfInformationRejected,
    payload: undefined,
  };
}

export type AppActionExample =
  | AppActionExampleGetPieceOfInformation
  | AppActionExampleGetPieceOfInformationPending
  | AppActionExampleGetPieceOfInformationFulfilled
  | AppActionExampleGetPieceOfInformationRejected;
