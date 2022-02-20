import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION, TRIP_REPOSITORY } from '../constats';
import { Connection } from 'typeorm';
import { Trip } from '../database/schema/trip.entity';

export const tripsProviders: Provider[] = [
  {
    provide: TRIP_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Trip),
    inject: [DATABASE_CONNECTION],
  },
];
