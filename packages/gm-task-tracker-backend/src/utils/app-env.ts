export interface AppEnv {
  readonly PORT: string;
  readonly EXAMPLE_ENV_VARIABLE: string;
}

export function getAppEnv(): AppEnv {
  return {
    PORT: process.env['PORT'] ?? '',
    EXAMPLE_ENV_VARIABLE: process.env['EXAMPLE_ENV_VARIABLE'] ?? '',
  };
}
