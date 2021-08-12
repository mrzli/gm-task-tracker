import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './local-auth.guard';
import { ProviderKeyAuth } from './provider-key-auth';
import { createAuthUtils } from './auth-utils';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    {
      provide: ProviderKeyAuth.PROVIDER_KEY_AUTH_UTILS,
      useValue: createAuthUtils(),
    },
  ],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
