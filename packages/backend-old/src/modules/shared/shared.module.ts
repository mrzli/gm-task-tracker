import { Module } from '@nestjs/common';
import { ProviderKeyShared } from './provider-key-shared';
import { createDateTimeUtils } from './date-time-utils';

@Module({
  imports: [],
  providers: [
    {
      provide: ProviderKeyShared.PROVIDER_KEY_SHARED_DATE_TIME_UTILS,
      useValue: createDateTimeUtils(),
    },
  ],
  exports: [ProviderKeyShared.PROVIDER_KEY_SHARED_DATE_TIME_UTILS],
})
export class SharedModule {}
