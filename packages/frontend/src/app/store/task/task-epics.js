import { combineEpics } from 'redux-observable';
import {
  actionTaskGetTasksFulfilled,
  actionTaskGetTasksPending,
  actionTaskGetTasksRejected,
} from './task-actions';
import { AppActionType } from '../base/app-action-type';
import { apiRequestHandler } from '../base/epic-utils';

const epicTaskGetTasks = (action$, state$, dependencies) => {
  return action$.pipe(
    apiRequestHandler({
      actionType: AppActionType.TaskGetTasks,
      actionPending: actionTaskGetTasksPending,
      apiMethod: dependencies.api.task.getTasks,
      actionFulfilled: actionTaskGetTasksFulfilled,
      actionRejected: actionTaskGetTasksRejected,
      state$: state$,
      dependencies: dependencies,
    })
  );
};

export function createTaskEpic() {
  const epicList = [epicTaskGetTasks];
  return combineEpics(...epicList);
}
