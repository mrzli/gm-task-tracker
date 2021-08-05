import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { emptyFn } from '@mrzli/gm-js-libraries-utilities/function';
import { config as configDotEnv } from 'dotenv';

configDotEnv();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(4000);
}

bootstrap().finally(emptyFn);
