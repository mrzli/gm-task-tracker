import { AppActionType } from '../base/app-action-type';

export function createExampleActions(dispatch) {
  return {
    getExampleData: () => dispatch(actionExampleGetExampleData()),
  };
}

export function actionExampleGetExampleData() {
  return {
    type: AppActionType.ExampleGetExampleData,
    payload: undefined,
  };
}

export function actionExampleGetExampleDataPending() {
  return {
    type: AppActionType.ExampleGetExampleDataPending,
    payload: undefined,
  };
}

export function actionExampleGetExampleDataFulfilled(payload) {
  return { type: AppActionType.ExampleGetExampleDataFulfilled, payload };
}

export function actionExampleGetExampleDataRejected() {
  return {
    type: AppActionType.ExampleGetExampleDataRejected,
    payload: undefined,
  };
}
