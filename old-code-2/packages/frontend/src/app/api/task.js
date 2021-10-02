import { restApi } from './base/rest-api';

export function createTaskApi() {
  return {
    fetchTasks,
  };
}

async function fetchTasks(userId) {
  const response = await restApi.get(`task/tasks/${userId}`);
  return response.data;
}
