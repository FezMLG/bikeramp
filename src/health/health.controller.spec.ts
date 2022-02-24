import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsHealthIndicator } from '../stats/stats.health';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealth = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthCheckService,
        TypeOrmHealthIndicator,
        StatsHealthIndicator,
      ],
    })
      .overrideProvider(HealthCheckService)
      .useValue(mockHealth)
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue(mockHealth)
      .overrideProvider(StatsHealthIndicator)
      .useValue(mockHealth)
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
