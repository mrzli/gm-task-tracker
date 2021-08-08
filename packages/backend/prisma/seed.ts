import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PERMISSIONS: readonly string[] = ['USER', 'ADMIN'];
const ROLES: readonly string[] = ['USER', 'ADMIN'];

const USERS: readonly string[] = ['example@example.com'];

async function execute(): Promise<void> {
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.rolePermission.deleteMany();

  await prisma.task.deleteMany();

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

  await prisma.userRole.createMany({
    data: [
      { userId: users[0].id, roleId: roles[0].id },
      { userId: users[0].id, roleId: roles[1].id },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        userId: users[0].id,
        text: 'task 001',
      },
      {
        userId: users[0].id,
        text: 'task 002',
      },
    ],
  });
}

execute()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
