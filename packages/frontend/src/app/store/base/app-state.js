import { createInitialExampleState } from '../example/example-state';
import { createInitialTaskState } from '../task/task-state';

export function createInitialAppState() {
  return {
    example: createInitialExampleState(),
    task: createInitialTaskState(),
  };
}
