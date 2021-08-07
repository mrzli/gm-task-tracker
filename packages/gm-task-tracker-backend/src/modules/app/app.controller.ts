import { Controller, Get } from '@nestjs/common';
import { Task } from '@prisma/client';
import { AppService } from './app.service';

@Controller({ path: 'app' })
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  public async getTasks(): Promise<readonly Task[]> {
    return this.appService.getTasks();
  }
}
