export function getAppEnv() {
  return {
    BASE_URL: process.env['BASE_URL'] ?? '',
    NODE_ENV: process.env['NODE_ENV'] ?? '',
    PUBLIC_URL: process.env['PUBLIC_URL'] ?? '',
    REACT_APP_VERSION: process.env['REACT_APP_VERSION'] ?? '',
    REACT_APP_BASE_URL: process.env['REACT_APP_BASE_URL'] ?? '',
    REACT_APP_REST_API_URL: process.env['REACT_APP_REST_API_URL'] ?? '',
  };
}
