import { Inject, Injectable } from '@nestjs/common';
import { AppEnv } from './app-env';
import { ProviderKeyConfig } from './provider-key-config';

@Injectable()
export class ConfigService {
  public constructor(
    @Inject(ProviderKeyConfig.PROVIDER_KEY_CONFIG_APP_ENV)
    private readonly appEnv: AppEnv
  ) {}

  public getAppEnv(): AppEnv {
    return this.appEnv;
  }
}
