import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function execute(): Promise<void> {
  await prisma.task.deleteMany({});
  await prisma.task.createMany({
    data: [
      {
        text: 'task 001',
      },
      {
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
