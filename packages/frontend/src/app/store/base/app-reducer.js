import { exampleReducer } from '../example/example-reducer';
import { taskReducer } from '../task/task-reducer';
import { authReducer } from '../auth/auth-reducer';

export function createAppReducer() {
  return {
    example: exampleReducer,
    auth: authReducer,
    task: taskReducer,
  };
}
