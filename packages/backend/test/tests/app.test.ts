import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { createTestApp } from '../utils/test-utils';

describe('AppController', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    app = await createTestApp(prismaClient);
  });

  afterEach(async () => {
    await prismaClient.$disconnect();
  });

  it('/api/app/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/app/hello')
      .expect(200)
      .expect('This is an env variable');
  });
});
