import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Trip } from './trips.entity';
import { TripInterface } from 'src/dto/trips/trip.interface';
import { TRIP_REPOSITORY } from 'src/constats';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TripsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripRepository.find();
  }

  findOne(id: string): Promise<Trip> {
    return this.tripRepository.findOne(id);
  }

  async createTrip(trip: TripInterface): Promise<InsertResult> {
    return this.tripRepository.insert(trip);
  }
}
