import { Dispatch } from 'redux';
import { AppActionType } from '../base/app-action-type';
import { AppActionBase } from '../base/app-action-base';
import { AppAction } from '../base/app-action';
import { Task } from '@mrzli/gm-task-tracker-dtos/task/task';

export interface TaskActions {
  readonly getTasks: () => void;
}

export function createTaskActions(dispatch: Dispatch<AppAction>): TaskActions {
  return {
    getTasks: () => dispatch(actionTaskGetTasks()),
  };
}

export type AppActionTaskGetTasks = AppActionBase<
  typeof AppActionType.TaskGetTasks
>;

export function actionTaskGetTasks(): AppActionTaskGetTasks {
  return {
    type: AppActionType.TaskGetTasks,
    payload: undefined,
  };
}

export type AppActionTaskGetTasksPending = AppActionBase<
  typeof AppActionType.TaskGetTasksPending
>;

export function actionTaskGetTasksPending(): AppActionTaskGetTasksPending {
  return {
    type: AppActionType.TaskGetTasksPending,
    payload: undefined,
  };
}

export type AppActionTaskGetTasksFulfilled = AppActionBase<
  typeof AppActionType.TaskGetTasksFulfilled,
  readonly Task[]
>;

export function actionTaskGetTasksFulfilled(
  payload: readonly Task[]
): AppActionTaskGetTasksFulfilled {
  return { type: AppActionType.TaskGetTasksFulfilled, payload };
}

export type AppActionTaskGetTasksRejected = AppActionBase<
  typeof AppActionType.TaskGetTasksRejected
>;

export function actionTaskGetTasksRejected(): AppActionTaskGetTasksRejected {
  return {
    type: AppActionType.TaskGetTasksRejected,
    payload: undefined,
  };
}

export type AppActionTask =
  | AppActionTaskGetTasks
  | AppActionTaskGetTasksPending
  | AppActionTaskGetTasksFulfilled
  | AppActionTaskGetTasksRejected;
