import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from '../../schema/trip.entity';
import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;
  const mockTripsRepository = {
    createTrip: jest.fn(() => {
      return {
        start_address: 'Lipków 05-080',
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
        id: 'byuksadbfksajdf',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    })
      .overrideProvider(TripsService)
      .useValue(mockTripsRepository)
      .compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a trip and return it', async () => {
    const trip = {
      start_address: 'Lipków 05-080',
      destination_address: 'Warsaw',
      price: 68,
      date: '2022-02-16',
    };
    expect(await service.createTrip(trip)).toEqual({
      ...trip,
      distance: expect.any(Number),
      id: expect.any(String),
    });
  });
});
