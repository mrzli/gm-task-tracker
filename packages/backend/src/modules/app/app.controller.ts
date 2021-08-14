import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ path: 'app' })
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('example-protected')
  public getExampleProtected(): string {
    return 'example-protected';
  }
}
