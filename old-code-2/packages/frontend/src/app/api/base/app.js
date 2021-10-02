import { createExampleApi } from '../example';
import { createTaskApi } from '../task';
import { createAuthApi } from '../auth';

export function createAppApi() {
  return {
    example: createExampleApi(),
    auth: createAuthApi(),
    task: createTaskApi(),
  };
}
