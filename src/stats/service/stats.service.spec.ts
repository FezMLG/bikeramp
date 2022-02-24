import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;

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
      providers: [StatsService],
    })
      .overrideProvider(StatsService)
      .useValue(mockTripsRepository)
      .compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an object of weekly stats', async () => {
    const kmRegex = /([0-9]+)(km)/gm;
    const PLNRegex = /([0-9]+)(PLN)/gm;

    expect(await service.getWeeklyStats()).toEqual({
      total_distance: expect.stringMatching(kmRegex),
      total_price: expect.stringMatching(PLNRegex),
    });
  });

  // it('should return an array of monthly stats objects', async () => {
  //   const kmRegex = /([0-9]+)(km)/gm;
  //   const PLNRegex = /([0-9]+)(PLN)/gm;

  //   expect(await service.getMonthlyStats()).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         date: expect.any(String),
  //         total_distance: expect.stringMatching(kmRegex),
  //         avg_ride: expect.stringMatching(kmRegex),
  //         avg_price: expect.stringMatching(PLNRegex),
  //       }),
  //     ]),
  //   );
  // });
});
