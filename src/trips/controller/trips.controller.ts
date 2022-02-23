import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTripDto } from '../../dto/trips/create-trip.dto';
import { TripsService } from '../service/trips.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FAIL_ADD_TRIP, FAIL_ROAD, SUCC_ADD_TRIP } from '../../constats';
import { TripInterface } from 'src/dto/trips/trip.interface';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // uncomment for debbuging
  @Get()
  async index(): Promise<TripInterface[]> {
    return this.tripsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiResponse({ status: 201, description: SUCC_ADD_TRIP })
  @ApiResponse({ status: 400, description: FAIL_ADD_TRIP })
  async createTrip(@Body() createTripDto: CreateTripDto) {
    let res = await this.tripsService.createTrip(createTripDto);
    if (res.raw[0].id) {
      res = {
        statusCode: 201,
        message: SUCC_ADD_TRIP,
      };
      return res;
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
