import { Test, TestingModule } from '@nestjs/testing';
import { SUCC_ADD_TRIP } from '../../constats';
import { TripsService } from '../service/trips.service';
import { TripsController } from './trips.controller';
var httpMocks = require('node-mocks-http');

describe('TripsController', () => {
  let controller: TripsController;

  const mockTripsService = {
    createTrip: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };
  const req = httpMocks.createRequest();
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

  it('should create a trip', () => {
    expect(
      controller.createTrip(
        {
          start_address: 'Lipków 05-080',
          destination_address: 'Warszawa',
          price: 68,
          date: '2022-02-16',
        },
        req.res,
      ),
    ).toBe({
      message: SUCC_ADD_TRIP,
    });
  });
});
