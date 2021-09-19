import { restApi } from './base/rest-api';

export function createTaskApi() {
  return {
    getTasks,
  };
}

async function getTasks(userId) {
  const response = await restApi.get(`task/tasks/${userId}`);
  return response.data;
}
