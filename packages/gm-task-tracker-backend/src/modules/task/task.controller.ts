import { Controller, Get } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TaskService } from './task.service';

@Controller({ path: 'task' })
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get('')
  public async getTasks(): Promise<readonly Task[]> {
    return this.taskService.getTasks();
  }
}
