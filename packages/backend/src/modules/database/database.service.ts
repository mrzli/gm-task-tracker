import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly _prismaClient: PrismaClient;

  public constructor() {
    this._prismaClient = new PrismaClient();
  }

  public async onModuleInit(): Promise<void> {
    await this._prismaClient.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    this._prismaClient.$on('beforeExit', async () => {
      console.log('beforeExit');
      await app.close();
    });
  }

  public get prismaClient(): PrismaClient {
    return this._prismaClient;
  }
}
