import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { checkPassword } from '../../utils/password-utils';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return undefined;
    }

    const isPasswordMatch = await checkPassword(password, user.password);
    return isPasswordMatch ? user : undefined;
  }
}
