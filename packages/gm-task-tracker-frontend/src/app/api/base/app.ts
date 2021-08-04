import { createExampleApi, ExampleApi } from '../example';

export interface AppApi {
  readonly example: ExampleApi;
}

export function createAppApi(): AppApi {
  return {
    example: createExampleApi(),
  };
}
