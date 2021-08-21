import { PrismaClient } from '@prisma/client';

export async function clearDb(prisma: PrismaClient): Promise<void> {
  await prisma.task.deleteMany();

  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
}
