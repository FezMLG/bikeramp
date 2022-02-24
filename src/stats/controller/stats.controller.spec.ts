import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from '../service/stats.service';
import { StatsController } from './stats.controller';

describe('StatsController', () => {
  let controller: StatsController;

  const mockTripsRepository = {
    getWeeklyStats: jest.fn(() => {
      return {
        total_distance: '0km',
        total_price: '0PLN',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [StatsService],
    })
      .overrideProvider(StatsService)
      .useValue(mockTripsRepository)
      .compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an object of weekly stats', async () => {
    const kmRegex = /([0-9]+)(km)/gm;
    const PLNRegex = /([0-9]+)(PLN)/gm;

    expect(await controller.getWeeklyStats()).toEqual({
      total_distance: expect.stringMatching(kmRegex),
      total_price: expect.stringMatching(PLNRegex),
    });
  });
});
