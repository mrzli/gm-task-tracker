import { ReducersMapObject } from 'redux';
import { AppState } from './app-state';
import { exampleReducer } from '../example/example-reducer';
import { taskReducer } from '../task/task-reducer';

// TODO GM: find a better typing for this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAppReducer(): ReducersMapObject<AppState, any> {
  return {
    example: exampleReducer,
    task: taskReducer,
  };
}
