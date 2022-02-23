import { Test, TestingModule } from '@nestjs/testing';
import { SUCC_ADD_TRIP } from '../../constats';
import { TripsService } from '../service/trips.service';
import { TripsController } from './trips.controller';
var httpMocks = require('node-mocks-http');

describe('TripsController', () => {
  let controller: TripsController;

  const mockTripsService = {
    createTrip: jest.fn(() => {
      return {
        identifiers: [{ id: 'e6b21841-62e8-4d9e-a848-cd344f6dc2d8' }],
        generatedMaps: [{ id: 'e6b21841-62e8-4d9e-a848-cd344f6dc2d8' }],
        raw: [{ id: 'e6b21841-62e8-4d9e-a848-cd344f6dc2d8' }],
      };
    }),
  };
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/api/trips',
    params: {
      start_address: 'Lipków 05-080',
      destination_address: 'Warszawa',
      price: 68,
      date: '2022-02-16',
    },
  });

  req.res = httpMocks.createResponse();

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
    expect(
      await controller.createTrip({
        start_address: 'Lipków 05-080',
        destination_address: 'Warszawa',
        price: 68,
        date: '2022-02-16',
      }),
    ).toEqual({
      statusCode: 201,
      message: SUCC_ADD_TRIP,
    });
  });
});
