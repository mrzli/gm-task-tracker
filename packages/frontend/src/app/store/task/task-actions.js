import { AppActionType } from '../base/app-action-type';

export function createTaskActions(dispatch) {
  return {
    getTasks: () => dispatch(actionTaskGetTasks()),
  };
}

export function actionTaskGetTasks() {
  return {
    type: AppActionType.TaskGetTasks,
    payload: undefined,
  };
}

export function actionTaskGetTasksPending() {
  return {
    type: AppActionType.TaskGetTasksPending,
    payload: undefined,
  };
}

export function actionTaskGetTasksFulfilled(payload) {
  return { type: AppActionType.TaskGetTasksFulfilled, payload };
}

export function actionTaskGetTasksRejected() {
  return {
    type: AppActionType.TaskGetTasksRejected,
    payload: undefined,
  };
}
