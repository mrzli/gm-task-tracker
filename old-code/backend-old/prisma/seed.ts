import { PrismaClient, Role, User } from '@prisma/client';
import { padNonNegativeIntWithZeroes } from '@mrzli/gm-js-libraries-utilities/number';
import { fillArrayOfLengthWithValueMapper } from '@mrzli/gm-js-libraries-utilities/array';
import { createAuthUtils } from '../src/modules/auth/auth-utils';
import { PermissionName } from '../src/modules/database/enums/permission-name';
import { RoleName } from '../src/modules/database/enums/role-name';
import { getEnumValues } from '@mrzli/gm-js-libraries-utilities/enum';
import { clearDb } from './clear-db';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12; // warning, should be the same as in env variable

execute(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const PERMISSIONS: readonly string[] = getEnumValues(PermissionName);
const ROLES: readonly string[] = getEnumValues(RoleName);

const USER_IDS: readonly number[] = fillArrayOfLengthWithValueMapper(
  3,
  (index) => index + 1
);

const authUtils = createAuthUtils();

async function execute(prisma: PrismaClient): Promise<void> {
  await clearDb(prisma);

  const permissions = await Promise.all(
    PERMISSIONS.map((permission) =>
      prisma.permission.create({ data: { name: permission } })
    )
  );
  const roles = await Promise.all(
    ROLES.map((role) => prisma.role.create({ data: { name: role } }))
  );

  await prisma.rolePermission.createMany({
    data: [
      { roleId: roles[0].id, permissionId: permissions[0].id },
      { roleId: roles[1].id, permissionId: permissions[1].id },
    ],
  });

  const users = await Promise.all(
    USER_IDS.map((userId) =>
      generateUserPassword(userId).then((password) =>
        prisma.user.create({
          data: {
            email: generateUserEmail(userId),
            password,
          },
        })
      )
    )
  );

  await Promise.all(users.map((user) => createExampleDataForUser(user, roles)));
}

async function createExampleDataForUser(
  user: User,
  roles: readonly Role[]
): Promise<void> {
  await Promise.all([
    prisma.userRole.createMany({
      data: [
        { userId: user.id, roleId: roles[0].id },
        { userId: user.id, roleId: roles[1].id },
      ],
    }),
    prisma.task.createMany({
      data: [
        {
          userId: user.id,
          text: 'task 001',
        },
        {
          userId: user.id,
          text: 'task 002',
        },
      ],
    }),
  ]);
}

function generateUserEmail(id: number): string {
  return `u${padNonNegativeIntWithZeroes(id, 1)}@e.com`;
}

async function generateUserPassword(id: number): Promise<string> {
  const plainTextPassword = `pass${padNonNegativeIntWithZeroes(id, 1)}`;
  return authUtils.hashPassword(plainTextPassword, SALT_ROUNDS);
}
