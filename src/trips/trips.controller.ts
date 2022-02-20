import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTripDto } from '../dto/trips/create-trip.dto';
import { TripsService } from './trips.service';
import { TripInterface } from '../dto/trips/trip.interface';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // uncomment for debbuging
  // @Get()
  // async index(): Promise<TripInterface[]> {
  //   return this.tripsService.findAll();
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(createTripDto);
  }
}
