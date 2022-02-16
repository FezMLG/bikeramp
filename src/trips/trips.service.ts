import { Injectable } from '@nestjs/common';
import { Trip } from 'src/dto/trips/trip.interface';

@Injectable()
export class TripsService {
  private readonly trips: Trip[] = [];

  get() {
    return this.trips;
  }

  create(trip: Trip) {
    this.trips.push(trip);
    return trip;
  }
}
