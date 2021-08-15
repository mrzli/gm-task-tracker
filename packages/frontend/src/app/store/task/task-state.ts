import { Task } from '@mrzli/gm-task-tracker-dtos';

export interface TaskState {
  readonly isLoading: boolean;
  readonly tasks: readonly Task[];
}

export function createInitialTaskState(): TaskState {
  return {
    isLoading: false,
    tasks: [],
  };
}
