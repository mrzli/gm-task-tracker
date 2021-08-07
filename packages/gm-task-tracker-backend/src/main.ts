import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { emptyFn } from '@mrzli/gm-js-libraries-utilities/function';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { getAppEnv } from './utils/app-env';
import { parseInteger } from '@mrzli/gm-js-libraries-utilities/number';
import { DatabaseService } from './modules/database/database.service';

function setupEnv(): void {
  const env = dotenv.config();
  dotenvExpand(env);
}

setupEnv();

async function bootstrap(): Promise<void> {
  const env = getAppEnv();
  const port = parseInteger(env.PORT);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const databaseService: DatabaseService = app.get(DatabaseService);
  databaseService.enableShutdownHooks(app);

  await app.listen(port);
}

bootstrap().finally(emptyFn);
