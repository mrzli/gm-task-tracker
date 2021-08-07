import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  public constructor(private readonly databaseService: DatabaseService) {}

  public async getTasks(): Promise<readonly Task[]> {
    return this.databaseService.prismaClient.task.findMany();
  }
}
