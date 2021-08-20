import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../utils/test-utils';
import { AnyObject } from '@mrzli/gm-js-libraries-utilities/types';
import {
  createExampleCustomError,
  createExampleInvalidString,
  createRequiredStringExamples,
  createZodIssueCustomNoField,
  createZodIssueInvalidString,
  createZodIssueUnrecognizedKeys,
} from '../../utils/zod-utils';
import { AppErrorType } from '../../../src/utils/errors/enums/app-error-type';
import { PrismaClient } from '@prisma/client';

describe('/api/auth/register (POST)', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    app = await createTestApp(prismaClient);
  });

  afterEach(async () => {
    await prismaClient.$disconnect();
  });

  const VALID_PASSWORD = 'pass$1AA';

  function createDefaultRequest(): AnyObject {
    return {
      email: 'a@b.com',
      password: VALID_PASSWORD,
      confirmPassword: VALID_PASSWORD,
    };
  }

  describe('invalid body', () => {
    interface Example {
      readonly input: AnyObject;
      readonly expected: AnyObject | RegExp | string;
    }

    const EXAMPLES: readonly Example[] = [
      ...createRequiredStringExamples(
        'email',
        1,
        256,
        [createZodIssueInvalidString('email', 'email')],
        [createZodIssueInvalidString('email', 'email')]
      ),
      createExampleInvalidString('email', 'not a valid email', 'email'),
      ...createRequiredStringExamples('password', 1, 256, [], []),
      createExampleCustomError(
        'password',
        'not a strong password',
        'is not a strong password'
      ),
      ...createRequiredStringExamples('confirmPassword', 1, 256, [], []),
      {
        input: {
          password: VALID_PASSWORD,
          confirmPassword: VALID_PASSWORD + 'a',
        },
        expected: {
          appErrorType: AppErrorType.Validation,
          zodIssues: [createZodIssueCustomNoField('passwords do not match')],
        },
      },
      {
        input: {
          notAValidField: 'some value',
        },
        expected: {
          appErrorType: AppErrorType.Validation,
          zodIssues: [createZodIssueUnrecognizedKeys('notAValidField')],
        },
      },
    ].map((example) => ({
      ...example,
      input: {
        ...createDefaultRequest(),
        ...example.input,
      },
    }));

    EXAMPLES.forEach((example) => {
      it(JSON.stringify(example), () => {
        return request(app.getHttpServer())
          .post('/api/auth/register')
          .send(example.input)
          .expect((response) => {
            expect(response.status).toEqual(400);
            expect(response.header['content-type']).not.toBeUndefined();
            expect(response.header['content-type']).toContain(
              'application/json'
            );
            const data = JSON.parse(response.text);
            expect(data).toEqual(example.expected);
          });
      });
    });
  });
});
