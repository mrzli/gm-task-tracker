import { restApi } from './base/rest-api';

export function createTaskApi() {
  return {
    getTasks,
  };
}

async function getTasks() {
  const response = await restApi.get('task');
  return response.data;
}
