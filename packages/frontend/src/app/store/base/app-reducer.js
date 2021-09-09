import { exampleReducer } from '../example/example-reducer';
import { taskReducer } from '../task/task-reducer';

export function createAppReducer() {
  return {
    example: exampleReducer,
    task: taskReducer,
  };
}
