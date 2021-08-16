import { Inject, Injectable } from '@nestjs/common';
import { AuthToken, Permission, Prisma, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { ProviderKeyShared } from '../shared/provider-key-shared';
import { DateTimeUtils } from '../shared/date-time-utils';
import {
  addTime,
  millisecondSinceEpochToDate,
  TimeUnit,
} from '@mrzli/gm-js-libraries-utilities/date';
import { asChainable } from '@mrzli/gm-js-libraries-utilities/fluent';
import { PrimaErrorCodePrismaClient } from '../database/enums/prima-error-codes';
import { createBadRequestException } from '../../utils/errors/error-factories';
import { AppErrorType } from '../../utils/errors/enums/app-error-type';
import { AppErrorTypeDb } from '../../utils/errors/enums/app-error-type-db';

@Injectable()
export class UserService {
  public constructor(
    @Inject(ProviderKeyShared.PROVIDER_KEY_SHARED_DATE_TIME_UTILS)
    private readonly dateTimeUtils: DateTimeUtils,
    private readonly databaseService: DatabaseService
  ) {}

  public async createUser(email: string, password: string): Promise<User> {
    try {
      return await this.databaseService.prismaClient.user.create({
        data: {
          email,
          password,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrimaErrorCodePrismaClient.UNIQUE_CONSTRAINT_ERROR) {
          throw createBadRequestException({
            appErrorType: AppErrorType.Db,
            dbErrorType: AppErrorTypeDb.UniqueConstraintViolated,
            model: 'User',
            field: 'email',
          });
        }
      }
      throw e;
    }
  }

  public async findUser(email: string): Promise<User | undefined> {
    const result = await this.databaseService.prismaClient.user.findUnique({
      where: { email },
    });
    return result ?? undefined;
  }

  public async findUserByToken(token: string): Promise<User | undefined> {
    const result = await this.databaseService.prismaClient.authToken.findUnique(
      {
        where: {
          token,
        },
        include: {
          user: true,
        },
      }
    );

    return result?.user ?? undefined;
  }

  public async findPermissionsByUserId(
    userId: number
  ): Promise<readonly Permission[]> {
    const results = await this.databaseService.prismaClient.user.findMany({
      where: {
        id: userId,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return asChainable(results)
      .flatMap((item) => item.userRoles)
      .flatMap((item) => item.role.rolePermissions)
      .map((item) => item.permission)
      .getValue();
  }

  public async createAccessToken(
    userId: number,
    token: string
  ): Promise<AuthToken> {
    await this.deleteAccessTokensForUser(userId);

    const currentDate = millisecondSinceEpochToDate(
      this.dateTimeUtils.millisecondsSinceEpoch()
    );
    const expirationDate = addTime(currentDate, 1, TimeUnit.Day);

    return await this.databaseService.prismaClient.authToken.create({
      data: {
        userId,
        token,
        expirationDate,
      },
    });
  }

  public async deleteAccessTokensForUser(userId: number): Promise<void> {
    await this.databaseService.prismaClient.authToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
