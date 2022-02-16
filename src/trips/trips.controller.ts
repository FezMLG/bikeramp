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
import { Trip } from 'src/dto/trips/trip.interface';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async index(): Promise<Trip[]> {
    return this.tripsService.get();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTripDto: CreateTripDto) {
    this.tripsService.create(createTripDto);
    return createTripDto;
  }
}
