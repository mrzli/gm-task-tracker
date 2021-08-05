import { Injectable } from '@nestjs/common';
import { ConfigService } from './modules/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.getAppEnv().EXAMPLE_ENV_VARIABLE;
  }
}
