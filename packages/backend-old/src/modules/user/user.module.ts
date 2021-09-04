import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, DatabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
