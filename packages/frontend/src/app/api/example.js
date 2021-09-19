import { restApi } from './base/rest-api';

export function createExampleApi() {
  return {
    fetchExampleData,
  };
}

async function fetchExampleData() {
  const response = await restApi.get('example/get');
  return response.data;
}
