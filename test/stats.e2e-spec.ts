import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsModule } from '../src/stats/stats.module';
import { StatsService } from '../src/stats/service/stats.service';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from '../src/schema/trip.entity';
import { TripsService } from '../src/trips/service/trips.service';
import { response } from 'express';

describe('StatsController (e2e)', () => {
  let app: INestApplication;
  const mockTripsRepository = {
    getWeeklyStats: jest.fn(() =>
      Promise.resolve({
        total_distance: '0km',
        total_price: '0PLN',
      }),
    ),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockReturnValueOnce({
        total_distance: '0km',
        total_price: '0PLN',
      }),
      getRawMany: jest.fn().mockReturnValueOnce([
        {
          date: 'February, 16th',
          total_distance: '3521km',
          avg_ride: '97.82km',
          avg_price: '60.46PLN',
        },
        {
          date: 'February, 17th',
          total_distance: '0km',
          avg_ride: '0.00km',
          avg_price: '68.00PLN',
        },
      ]),
    })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StatsModule],
    })
      .overrideProvider(getRepositoryToken(Trip))
      .useValue(mockTripsRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/api/stats/weekly (GET)`, () => {
    const kmRegex = /([0-9]+)(km)/gm;
    const PLNRegex = /([0-9]+)(PLN)/gm;
    return request(app.getHttpServer())
      .get('/stats/weekly')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          total_distance: expect.stringMatching(kmRegex),
          total_price: expect.stringMatching(PLNRegex),
        });
      });
  });

  // it(`/api/stats/monthly (GET)`, () => {
  //   const kmRegex = /([0-9]+)(km)/gm;
  //   const PLNRegex = /([0-9]+)(PLN)/gm;
  //   return request(app.getHttpServer())
  //     .get('/stats/monthly')
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual(
  //         expect.arrayContaining([
  //           expect.objectContaining({
  //             date: expect.any(String),
  //             total_distance: expect.stringMatching(kmRegex),
  //             avg_ride: expect.stringMatching(kmRegex),
  //             avg_price: expect.stringMatching(PLNRegex),
  //           }),
  //         ]),
  //       );
  //     });
  // });
});
