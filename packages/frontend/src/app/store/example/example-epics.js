import { combineEpics } from 'redux-observable';
import {
  actionExampleGetExampleDataFulfilled,
  actionExampleGetExampleDataPending,
  actionExampleGetExampleDataRejected,
} from './example-actions';
import { AppActionType } from '../base/app-action-type';
import { apiRequestHandler } from '../base/epic-utils';

const epicExampleGetExampleData = (action$, state$, dependencies) => {
  return action$.pipe(
    apiRequestHandler({
      actionType: AppActionType.ExampleGetExampleData,
      actionPending: actionExampleGetExampleDataPending,
      apiMethod: dependencies.api.example.getExampleData,
      actionFulfilled: actionExampleGetExampleDataFulfilled,
      actionRejected: actionExampleGetExampleDataRejected,
      state$: state$,
      dependencies: dependencies,
    })
  );
};

export function createExampleEpic() {
  const epicList = [epicExampleGetExampleData];
  return combineEpics(...epicList);
}
