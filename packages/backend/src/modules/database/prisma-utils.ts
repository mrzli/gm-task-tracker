import { PrismaClient } from '@prisma/client';

export interface PrismaUtils {
  readonly createPrismaClient: () => PrismaClient;
}

export function createPrismaUtils(): PrismaUtils {
  return {
    createPrismaClient: () => new PrismaClient(),
  };
}
