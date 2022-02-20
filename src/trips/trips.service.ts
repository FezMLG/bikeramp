import { Inject, Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trip } from '../database/schema/trip.entity';
import {
  BICYCLING,
  FAIL_ROAD,
  GOOGLE_MAPS_API_KEY,
  TRIP_REPOSITORY,
} from '../constats';
import { ConfigService } from '@nestjs/config';
import { CreateTripDto } from '../dto/trips/create-trip.dto';
import axios from 'axios';

@Injectable({ scope: Scope.REQUEST })
export class TripsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
    private configService: ConfigService,
  ) {}

  // for debbuging
  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  async createTrip(createTripDto: CreateTripDto): Promise<any> {
    const { start_address, destination_address, price } = createTripDto;

    // Distance is calculated in meters
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURI(
        start_address,
      )}&destinations=${encodeURI(
        destination_address,
      )}&mode=${BICYCLING}&key=${encodeURI(
        this.configService.get(GOOGLE_MAPS_API_KEY),
      )}`,
    );
    if (data.rows[0].elements[0].status != 'OK') {
      return { message: FAIL_ROAD };
    }
    const distance = data.rows[0].elements[0].distance.value;
    return await this.tripRepository.insert({
      ...createTripDto,
      distance,
    });
  }
}
