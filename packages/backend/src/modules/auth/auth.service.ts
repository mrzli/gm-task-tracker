import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    // check for password
    return user;
  }
}
