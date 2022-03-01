import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trip } from '../../schema/trip.entity';
import { BICYCLING, FAIL_ROAD, GOOGLE_MAPS_API_KEY } from '../../constats';
import { ConfigService } from '@nestjs/config';
import { CreateTripDto } from '../../dto/trips/create-trip.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    private configService: ConfigService,
  ) {}

  // for debbuging
  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  async createTrip(createTripDto: CreateTripDto): Promise<any> {
    const { start_address, destination_address } = createTripDto;

    // Distance is calculated in meters
    try {
      const googleApi = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURI(
          start_address,
        )}&destinations=${encodeURI(
          destination_address,
        )}&mode=${BICYCLING}&key=${encodeURI(
          this.configService.get(GOOGLE_MAPS_API_KEY),
        )}`,
      );
      if (googleApi.data.rows[0].elements[0].status != 'OK') {
        throw new HttpException(FAIL_ROAD, HttpStatus.BAD_REQUEST);
      }
      const distance = googleApi.data.rows[0].elements[0].distance.value;
      // const distance = 0;
      return await this.tripRepository.save({
        ...createTripDto,
        distance,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
