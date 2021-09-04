import { restApi } from './base/rest-api';

export interface ExampleApi {
  readonly getPieceOfInformation: typeof getPieceOfInformation;
}

export function createExampleApi(): ExampleApi {
  return {
    getPieceOfInformation,
  };
}

async function getPieceOfInformation(): Promise<string> {
  const response = await restApi.get<string>('app/hello');

  return response.data;
}
