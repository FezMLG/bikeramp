import { Test, TestingModule } from '@nestjs/testing';
import { SUCC_ADD_TRIP } from '../../constats';
import { TripsService } from '../service/trips.service';
import { TripsController } from './trips.controller';

describe('TripsController', () => {
  let controller: TripsController;

  const mockTripsService = {
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [TripsService],
    })
      .overrideProvider(TripsService)
      .useValue(mockTripsService)
      .compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a trip', async () => {
    const trip = {
      start_address: 'Lipków 05-080',
      destination_address: 'Warsaw',
      price: 68,
      date: new Date('2022-02-16'),
    };
    expect(await controller.createTrip(trip)).toEqual({
      statusCode: 201,
      message: SUCC_ADD_TRIP,
    });
  });
});
