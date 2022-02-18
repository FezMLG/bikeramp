import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trip } from '../database/trip.entity';
import { BICYCLING, GOOGLE_MAPS_API_KEY, TRIP_REPOSITORY } from '../constats';
import { ConfigService } from '@nestjs/config';
import { CreateTripDto } from '../dto/trips/create-trip.dto';
import axios from 'axios';

@Injectable()
export class TripsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  findOne(id: string): Promise<Trip> {
    return this.tripRepository.findOne(id);
  }

  async createTrip(createTripDto: CreateTripDto): Promise<any> {
    const { start_address, destination_address, price } = createTripDto;

    if (price < 0) {
      return { message: 'Route not found' };
    }

    // Distance is calculated in meters
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start_address}&destinations=${destination_address}&mode=${BICYCLING}&key=${this.configService.get(
        GOOGLE_MAPS_API_KEY,
      )}`,
    );
    if (data.rows[0].elements[0].status != 'OK') {
      return { message: 'Route not found' };
    }
    const distance = data.rows[0].elements[0].distance.value;
    return await this.tripRepository.insert({
      ...createTripDto,
      distance,
    });
  }
}
