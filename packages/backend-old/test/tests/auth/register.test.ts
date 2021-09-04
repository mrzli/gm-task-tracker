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
import { StatusCodes } from 'http-status-codes';
import { clearDb } from '../../../prisma/clear-db';

const ENDPOINT_PATH = '/api/auth/register';

describe(`${ENDPOINT_PATH} (POST)`, () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    prisma = new PrismaClient();
    app = await createTestApp(prisma);
  });

  afterEach(async () => {
    await clearDb(prisma);
    await prisma.$disconnect();
  });

  const EXAMPLE_EMAIL = 'a@b.com';
  const VALID_PASSWORD = 'pass$1AA';

  function createDefaultRequest(): AnyObject {
    return {
      email: EXAMPLE_EMAIL,
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
          .post(ENDPOINT_PATH)
          .send(example.input)
          .expect((response) => {
            expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
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

  // TODO GM: I think it is almost complete, need to seed the data with roles
  // it('should work', async () => {
  //   const result = await request(app.getHttpServer())
  //     .post(ENDPOINT_PATH)
  //     .send(createDefaultRequest())
  //     .expect((response) => {
  //       console.log(JSON.stringify(response, null, 2));
  //       expect(response.status).toEqual(StatusCodes.CREATED);
  //       expect(response.header['content-type']).not.toBeUndefined();
  //       expect(response.header['content-type']).toContain('application/json');
  //       const data = JSON.parse(response.text);
  //       expect(data).toMatchObject({
  //         id: expect.toBeNumber(),
  //         email: EXAMPLE_EMAIL,
  //       });
  //       expect(data.password).toBeUndefined();
  //     });
  //
  //   const id = JSON.parse(result.text).id;
  //
  //   const user = await prisma.user.findUnique({
  //     where: { id },
  //     include: {
  //       userRoles: {
  //         include: {
  //           role: { include: { rolePermissions: { include: { role: true } } } },
  //         },
  //       },
  //     },
  //   });
  //   expect(user).not.toBeNil();
  //   expect(user).toMatchObject({
  //     id: expect.toBeNumber(),
  //     email: EXAMPLE_EMAIL,
  //     password: VALID_PASSWORD,
  //     permissions: [PermissionName.USER],
  //   });
  // });
});
