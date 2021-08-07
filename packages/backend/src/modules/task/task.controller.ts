import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@mrzli/gm-task-tracker-dtos/task/task';

@Controller({ path: 'task' })
export class TaskController {
  public constructor(private readonly taskService: TaskService) {}

  @Get('')
  public async getTasks(): Promise<readonly Task[]> {
    const result = await this.taskService.getTasks();
    return result.map((item) => ({ id: item.id, text: item.text }));
  }
}
