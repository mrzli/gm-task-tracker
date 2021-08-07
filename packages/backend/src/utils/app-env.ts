export interface AppEnv {
  readonly PORT: string;
  readonly EXAMPLE_ENV_VARIABLE: string;
  readonly DB_HOST: string;
  readonly DB_PORT: string;
  readonly DB_NAME: string;
  readonly DB_USER: string;
  readonly DB_PASS: string;
  readonly DB_URL: string;
}

export function getAppEnv(): AppEnv {
  return {
    PORT: process.env['PORT'] ?? '',
    EXAMPLE_ENV_VARIABLE: process.env['EXAMPLE_ENV_VARIABLE'] ?? '',
    DB_HOST: process.env['DB_HOST'] ?? '',
    DB_PORT: process.env['DB_PORT'] ?? '',
    DB_NAME: process.env['DB_NAME'] ?? '',
    DB_USER: process.env['DB_USER'] ?? '',
    DB_PASS: process.env['DB_PASS'] ?? '',
    DB_URL: process.env['DB_URL'] ?? '',
  };
}
