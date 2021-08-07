import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { ConfigService } from '../config/config.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AppService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {}

  public getHello(): string {
    return this.configService.getAppEnv().EXAMPLE_ENV_VARIABLE;
  }

  public async getTasks(): Promise<readonly Task[]> {
    return this.databaseService.prismaClient.task.findMany();
  }
}
