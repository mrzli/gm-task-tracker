import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth-utils';
import { ProviderKeyAuth } from './provider-key-auth';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(ProviderKeyAuth.PROVIDER_KEY_AUTH_UTILS)
    private readonly authUtils: AuthUtils,
    private readonly userService: UserService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return undefined;
    }

    const isPasswordMatch = await this.authUtils.checkPassword(
      password,
      user.password
    );
    return isPasswordMatch ? user : undefined;
  }
}
