import { AppEpic } from '../base/app-epic';
import { combineEpics } from 'redux-observable';
import { AppDependencies } from '../../setup/app-dependencies';
import {
  actionTaskGetTasksFulfilled,
  actionTaskGetTasksPending,
  actionTaskGetTasksRejected,
  AppActionTaskGetTasks,
} from './task-actions';
import { AppActionType } from '../base/app-action-type';
import { apiRequestHandler } from '../base/epic-utils';
import { Observable } from 'rxjs';
import { AppAction } from '../base/app-action';
import { Task } from '@mrzli/gm-task-tracker-dtos/task/task';

const epicTaskGetTasks: AppEpic = (
  action$,
  state$,
  dependencies: AppDependencies
): Observable<AppAction> => {
  return action$.pipe(
    apiRequestHandler<AppActionTaskGetTasks, readonly Task[]>({
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

export function createTaskEpic(): AppEpic {
  const epicList: readonly AppEpic[] = [epicTaskGetTasks];
  return combineEpics(...epicList);
}
