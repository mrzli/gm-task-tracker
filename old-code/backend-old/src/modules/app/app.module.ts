import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [SharedModule, ConfigModule, AuthModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
