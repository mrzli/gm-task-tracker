import { AppActionType } from '../base/app-action-type';
import { createInitialTaskState, TaskState } from './task-state';
import { AppActionTask } from './task-actions';

export function taskReducer(
  state: TaskState = createInitialTaskState(),
  action: AppActionTask
): TaskState {
  switch (action.type) {
    case AppActionType.TaskGetTasksPending:
      return {
        ...state,
        isLoading: true,
      };

    case AppActionType.TaskGetTasksFulfilled:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
      };

    case AppActionType.TaskGetTasksRejected:
      return {
        ...state,
        isLoading: false,
        tasks: [],
      };

    default:
      return state;
  }
}
