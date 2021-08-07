import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AppService {
  public constructor(private readonly configService: ConfigService) {}

  public getHello(): string {
    return this.configService.getAppEnv().EXAMPLE_ENV_VARIABLE;
  }
}
