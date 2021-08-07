import { createExampleApi, ExampleApi } from '../example';
import { createTaskApi, TaskApi } from '../task';

export interface AppApi {
  readonly example: ExampleApi;
  readonly task: TaskApi;
}

export function createAppApi(): AppApi {
  return {
    example: createExampleApi(),
    task: createTaskApi(),
  };
}
