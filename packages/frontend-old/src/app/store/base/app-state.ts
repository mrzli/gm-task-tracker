import {
  createInitialExampleState,
  ExampleState,
} from '../example/example-state';
import { createInitialTaskState, TaskState } from '../task/task-state';

export interface AppState {
  readonly example: ExampleState;
  readonly task: TaskState;
}

export function createInitialAppState(): AppState {
  return {
    example: createInitialExampleState(),
    task: createInitialTaskState(),
  };
}
