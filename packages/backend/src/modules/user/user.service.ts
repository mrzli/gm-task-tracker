import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async findOne(email: string): Promise<User | undefined> {
    const result = await this.databaseService.prismaClient.user.findUnique({
      where: { email },
    });
    return result ?? undefined;
  }
}
