import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ProviderKeyDatabase } from './provider-key-database';
import { createPrismaUtils } from './prisma-utils';

@Module({
  imports: [],
  providers: [
    DatabaseService,
    {
      provide: ProviderKeyDatabase.PROVIDER_KEY_DATABASE_PRISMA_UTILS,
      useValue: createPrismaUtils(),
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
