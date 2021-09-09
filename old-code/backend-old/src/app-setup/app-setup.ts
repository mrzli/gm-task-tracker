import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { DatabaseService } from '../modules/database/database.service';

export function setupApp(app: INestApplication): void {
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());
  const databaseService: DatabaseService = app.get(DatabaseService);
  databaseService.enableShutdownHooks(app);
}
