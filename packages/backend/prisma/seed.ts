import { PrismaClient, Role, User } from '@prisma/client';
import { padNonNegativeIntWithZeroes } from '@mrzli/gm-js-libraries-utilities/number';
import { fillArrayOfLengthWithValueMapper } from '@mrzli/gm-js-libraries-utilities/array';

const prisma = new PrismaClient();

execute(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const PERMISSIONS: readonly string[] = ['USER', 'ADMIN'];
const ROLES: readonly string[] = ['USER', 'ADMIN'];

const USERS: readonly string[] = fillArrayOfLengthWithValueMapper(
  3,
  (index) => `u${padNonNegativeIntWithZeroes(index + 1, 1)}@e.com`
);

async function execute(prisma: PrismaClient): Promise<void> {
  await prisma.task.deleteMany();

  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

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
    USERS.map((user) =>
      prisma.user.create({
        data: {
          email: user,
        },
      })
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
