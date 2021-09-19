import { createInitialExampleState } from '../example/example-state';
import { createInitialTaskState } from '../task/task-state';
import { createInitialAuthState } from '../auth/auth-state';

export function createInitialAppState() {
  return {
    example: createInitialExampleState(),
    auth: createInitialAuthState(),
    task: createInitialTaskState(),
  };
}
