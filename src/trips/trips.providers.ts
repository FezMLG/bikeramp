import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION, TRIP_REPOSITORY } from 'src/constats';
import { Connection } from 'typeorm';
import { Trip } from './trips.entity';

export const tripsProviders: Provider[] = [
  {
    provide: TRIP_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Trip),
    inject: [DATABASE_CONNECTION],
  },
];
