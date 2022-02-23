import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StatsModule } from '../src/stats/stats.module';
import { StatsService } from '../src/stats/service/stats.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let statsService = { getWeeklyStats: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StatsModule],
    })
      .overrideProvider(StatsService)
      .useValue(statsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: statsService.getWeeklyStats(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
