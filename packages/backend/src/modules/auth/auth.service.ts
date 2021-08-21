import { Inject, Injectable } from '@nestjs/common';
import { AuthToken, User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth-utils';
import { ProviderKeyAuth } from './provider-key-auth';
import { RegisterRequestData } from '@mrzli/gm-task-tracker-dtos';
import { ConfigService } from '../config/config.service';
import { parseInteger } from '@mrzli/gm-js-libraries-utilities/number';
import { RoleName } from '../database/enums/role-name';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(ProviderKeyAuth.PROVIDER_KEY_AUTH_UTILS)
    private readonly authUtils: AuthUtils,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userService.findUser(email);
    if (!user) {
      return undefined;
    }

    const isPasswordMatch = await this.authUtils.checkPassword(
      password,
      user.password
    );
    return isPasswordMatch ? user : undefined;
  }

  public async registerUser(
    data: RegisterRequestData,
    roleNames: readonly RoleName[]
  ): Promise<User> {
    const saltRounds = parseInteger(
      this.configService.getAppEnv().HASH_SALT_ROUNDS
    );
    const hashedPassword = await this.authUtils.hashPassword(
      data.password,
      saltRounds
    );
    return this.userService.createUser(data.email, hashedPassword, roleNames);
  }

  public async createAuthToken(user: User): Promise<AuthToken> {
    const token = this.authUtils.generateAccessToken();
    return this.userService.createAccessToken(user.id, token);
  }

  public async deleteAccessTokensForUser(user: User): Promise<void> {
    await this.userService.deleteAccessTokensForUser(user.id);
  }
}
