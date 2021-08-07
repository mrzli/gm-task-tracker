import {
  createInitialExampleState,
  ExampleState,
} from '../example/example-state';

export interface AppState {
  readonly example: ExampleState;
}

export function createInitialAppState(): AppState {
  return {
    example: createInitialExampleState(),
  };
}
