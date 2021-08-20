import { DateTimeUtils } from '../../src/modules/shared/date-time-utils';
import { AuthUtils } from '../../src/modules/auth/auth-utils';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/modules/app/app.module';
import { ProviderKeyShared } from '../../src/modules/shared/provider-key-shared';
import { ProviderKeyAuth } from '../../src/modules/auth/provider-key-auth';
import { setupApp } from '../../src/app-setup/app-setup';
import { padNonNegativeIntWithZeroes } from '@mrzli/gm-js-libraries-utilities/number';

export async function createTestApp(): Promise<INestApplication> {
  return createTestAppWithSpecificMocks(
    createTestDateTimeUtils(),
    createTestAuthUtils()
  );
}

export async function createTestAppWithSpecificMocks(
  dateTimeUtils: DateTimeUtils,
  authUtils: AuthUtils
): Promise<INestApplication> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ProviderKeyShared.PROVIDER_KEY_SHARED_DATE_TIME_UTILS)
    .useValue(dateTimeUtils)
    .overrideProvider(ProviderKeyAuth.PROVIDER_KEY_AUTH_UTILS)
    .useValue(authUtils)
    .compile();

  const app = testingModule.createNestApplication();
  setupApp(app);
  await app.init();

  return app;
}

export function createTestDateTimeUtils(): DateTimeUtils {
  let currentTime = 0;
  return {
    millisecondsSinceEpoch(): number {
      return currentTime++;
    },
  };
}

export function createTestAuthUtils(): AuthUtils {
  let currentToken = 0;
  return {
    hashPassword: async (plainTextPassword: string) => plainTextPassword,
    checkPassword: async (plainTextPassword: string, hash: string) =>
      plainTextPassword === hash,
    generateAccessToken: () => padNonNegativeIntWithZeroes(currentToken++, 40),
  };
}
