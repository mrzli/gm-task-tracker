import { createExampleApi } from '../example';
import { createTaskApi } from '../task';

export function createAppApi() {
  return {
    example: createExampleApi(),
    task: createTaskApi(),
  };
}
