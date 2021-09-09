import { AppActionType } from '../base/app-action-type';
import { createInitialTaskState } from './task-state';

export function taskReducer(state = createInitialTaskState(), action) {
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
