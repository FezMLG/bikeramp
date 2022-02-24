import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsHealthIndicator } from '../stats/stats.health';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealth = {
    check: jest.fn(() => {
      return {
        status: 'ok',
        info: {
          typeorm: {
            status: 'up',
          },
          stats: {
            status: 'up',
            monthlyStats: {
              status: true,
              length: 4,
            },
            weeklyStats: {
              status: true,
              weeklyStats: {
                total_distance: '0km',
                total_price: '0PLN',
              },
            },
          },
          'Google Maps API': {
            status: 'up',
          },
        },
        error: {},
        details: {
          typeorm: {
            status: 'up',
          },
          stats: {
            status: 'up',
            monthlyStats: {
              status: true,
              length: 4,
            },
            weeklyStats: {
              status: true,
              weeklyStats: {
                total_distance: '0km',
                total_price: '0PLN',
              },
            },
          },
          'Google Maps API': {
            status: 'up',
          },
        },
      };
    }),
  };

  const mockOtherProviders = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthCheckService,
        TypeOrmHealthIndicator,
        StatsHealthIndicator,
        HttpHealthIndicator,
      ],
    })
      .overrideProvider(HealthCheckService)
      .useValue(mockHealth)
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue(mockOtherProviders)
      .overrideProvider(StatsHealthIndicator)
      .useValue(mockOtherProviders)
      .overrideProvider(HttpHealthIndicator)
      .useValue(mockOtherProviders)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return any health object', () => {
    expect(controller.check()).toEqual(expect.any(Object));
  });
});
