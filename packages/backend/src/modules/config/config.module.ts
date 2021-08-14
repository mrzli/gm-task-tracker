import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ProviderKeyConfig } from './provider-key-config';
import { getAppEnv } from './app-env';

@Module({
  imports: [],
  providers: [
    ConfigService,
    {
      provide: ProviderKeyConfig.PROVIDER_KEY_CONFIG_APP_ENV,
      useFactory: () => getAppEnv(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
