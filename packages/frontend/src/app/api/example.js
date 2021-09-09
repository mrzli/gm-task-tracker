import { restApi } from './base/rest-api';

export function createExampleApi() {
  return {
    getExampleData,
  };
}

async function getExampleData() {
  const response = await restApi.get('example/get');
  return response.data;
}
