import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateTripDto } from 'src/dto/trips/create-trip.dto';
import { TripsService } from './trips.service';
import { TripInterface } from 'src/dto/trips/trip.interface';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async index(): Promise<TripInterface[]> {
    return this.tripsService.findAll();
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(createTripDto);
  }
}
