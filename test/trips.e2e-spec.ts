import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from '../src/schema/trip.entity';
import { FAIL_ROAD, SUCC_ADD_TRIP } from '../src/constats';
import { TripsModule } from '../src/trips/trips.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config';

describe('StatsController (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      // this is being super extra, in the case that you need multiple keys with the `get` method
      if (key === 'GOOGLE_MAPS_API_KEY') {
        // return 'AIzaSyDfbs7MKD5rQ0za1R0rSDATKEALJs8y-Co';
        return process.env.GOOGLE_MAPS_API_KEY;
      }
      return null;
    }),
  };
  const mockTripsRepository = {
    createTrip: jest.fn(() => {
      return {
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Warsaw',
        price: 68,
        date: '2022-02-16',
        distance: 19277,
        id: '9172da69-a219-4810-b5fa-ac618ba7538f',
      };
    }),
    save: jest.fn().mockImplementation((trip) =>
      Promise.resolve({
        ...trip,
        id: '9172da69-a219-4810-b5fa-ac618ba7538f',
      }),
    ),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TripsModule, ConfigModule],
      providers: [ConfigService],
    })
      .overrideProvider(getRepositoryToken(Trip))
      .useValue(mockTripsRepository)
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    config = moduleFixture.get<ConfigService>(ConfigService);
    await app.init();
  });

  it(`/api/trips (POST)`, () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Warsaw',
        price: 68,
        date: '2022-02-16',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 201,
          message: SUCC_ADD_TRIP,
        });
      });
  });

  it(`/api/trips (POST) --> 400 on wrong api key`, () => {
    process.env.GOOGLE_MAPS_API_KEY = '';
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Warsaw',
        price: 68,
        date: '2022-02-16',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it(`/api/trips (POST) --> 400 on wrong api key`, () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Warsaw',
        price: 68,
        date: '2022-02-16',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it(`/api/trips (POST) --> 400 on validation error`, () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Warsaw',
        price: -68,
        date: '2022-02-16',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it(`/api/trips (POST) --> 400 when missing parameters`, () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it(`/api/trips (POST) --> 400 when route is invalid`, () => {
    return request(app.getHttpServer())
      .post('/trips')
      .send({
        start_address: 'Grzybowska 62, 00-844 Warszawa',
        destination_address: 'Quebec, Kanada',
        price: 68,
        date: '2022-02-16',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
});
