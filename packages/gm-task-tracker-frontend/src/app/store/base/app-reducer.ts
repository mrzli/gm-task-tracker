import { ReducersMapObject } from 'redux';
import { AppState } from './app-state';
import { exampleReducer } from '../example/example-reducer';
import { AppActionExample } from '../example/example-actions';

export function createAppReducer(): ReducersMapObject<
  AppState,
  AppActionExample
> {
  return {
    example: exampleReducer,
  };
}
