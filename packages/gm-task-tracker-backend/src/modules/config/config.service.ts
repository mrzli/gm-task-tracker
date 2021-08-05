import { Injectable } from '@nestjs/common';
import { AppEnv, getAppEnv } from '../../utils/app-env';

@Injectable()
export class ConfigService {
  private readonly appEnv: AppEnv;

  constructor() {
    this.appEnv = getAppEnv();
  }

  public getAppEnv(): AppEnv {
    return this.appEnv;
  }
}
