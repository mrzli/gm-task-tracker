export interface AppEnv {
  readonly BASE_URL: string;
  readonly NODE_ENV: string;
  readonly PUBLIC_URL: string;
  readonly REACT_APP_BASE_URL: string;
  readonly REACT_APP_REST_API: string;
}

export function getAppEnv(): AppEnv {
  return {
    BASE_URL: process.env['BASE_URL'] ?? '',
    NODE_ENV: process.env['NODE_ENV'] ?? '',
    PUBLIC_URL: process.env['PUBLIC_URL'] ?? '',
    REACT_APP_BASE_URL: process.env['REACT_APP_BASE_URL'] ?? '',
    REACT_APP_REST_API: process.env['REACT_APP_REST_API_URL'] ?? '',
  };
}
