import { Inject, Injectable } from '@nestjs/common';
import { User, AuthToken } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { ProviderKeyShared } from '../shared/provider-key-shared';
import { DateTimeUtils } from '../shared/date-time-utils';
import { millisecondSinceEpochToDate } from '@mrzli/gm-js-libraries-utilities/date';

@Injectable()
export class UserService {
  public constructor(
    @Inject(ProviderKeyShared.PROVIDER_KEY_SHARED_DATE_TIME_UTILS)
    private readonly dateTimeUtils: DateTimeUtils,
    private readonly databaseService: DatabaseService
  ) {}

  public async findUser(email: string): Promise<User | undefined> {
    const result = await this.databaseService.prismaClient.user.findUnique({
      where: { email },
    });
    return result ?? undefined;
  }

  public async createAccessToken(
    userId: number,
    token: string
  ): Promise<AuthToken> {
    await this.databaseService.prismaClient.authToken.deleteMany({
      where: {
        userId,
      },
    });

    return await this.databaseService.prismaClient.authToken.create({
      data: {
        userId,
        token,
        expirationDate: millisecondSinceEpochToDate(
          this.dateTimeUtils.millisecondsSinceEpoch() + 86_400_000 // TODO GM: change this, for now 1 day
        ),
      },
    });
  }
}
