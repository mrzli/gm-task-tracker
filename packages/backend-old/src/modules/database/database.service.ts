import {
  INestApplication,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProviderKeyDatabase } from './provider-key-database';
import { PrismaUtils } from './prisma-utils';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly _prismaClient: PrismaClient;

  public constructor(
    @Inject(ProviderKeyDatabase.PROVIDER_KEY_DATABASE_PRISMA_UTILS)
    private readonly prismaUtils: PrismaUtils
  ) {
    this._prismaClient = prismaUtils.createPrismaClient();
  }

  public async onModuleInit(): Promise<void> {
    await this._prismaClient.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    this._prismaClient.$on('beforeExit', async () => {
      await app.close();
    });
  }

  public get prismaClient(): PrismaClient {
    return this._prismaClient;
  }
}
