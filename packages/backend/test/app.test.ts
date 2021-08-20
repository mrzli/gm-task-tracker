import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './utils/test-utils';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it('/api/app/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/app/hello')
      .expect(200)
      .expect('This is an env variable');
  });
});
