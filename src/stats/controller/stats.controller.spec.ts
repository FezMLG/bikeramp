import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from '../service/stats.service';
import { StatsController } from './stats.controller';

describe('StatsController', () => {
  let controller: StatsController;

  const mockStatsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [StatsService],
    })
      .overrideProvider(StatsService)
      .useValue(mockStatsService)
      .compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
