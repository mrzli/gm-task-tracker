import { exampleReducer } from './example-slice';
import { taskReducer } from './task/task-reducer';
import { authReducer } from './auth/auth-reducer';

export function createAppReducer() {
  return {
    example: exampleReducer,
    auth: authReducer,
    task: taskReducer,
  };
}
