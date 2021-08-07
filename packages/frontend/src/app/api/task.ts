import { Task } from '@mrzli/gm-task-tracker-dtos/task/task';
import { restApi } from './base/rest-api';

export interface TaskApi {
  readonly getTasks: typeof getTasks;
}

export function createTaskApi(): TaskApi {
  return {
    getTasks,
  };
}

async function getTasks(): Promise<readonly Task[]> {
  const response = await restApi.get<readonly Task[]>('task');
  return response.data;
}
