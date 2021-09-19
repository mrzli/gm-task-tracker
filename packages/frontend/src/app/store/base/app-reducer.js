import { exampleReducer } from '../example-slice';
import { authReducer } from '../auth-slice';
import { taskReducer } from '../task-slice';

export function createAppReducer() {
  return {
    example: exampleReducer,
    auth: authReducer,
    task: taskReducer,
  };
}
