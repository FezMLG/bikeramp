import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constats';
import { ConfigService } from '@nestjs/config';
import { Trip } from './schema/trip.entity';

// configuration for database connection
export const databaseProvider = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get('DBConfig.DB_TYPE'),
        host: configService.get('DBConfig.DB_HOST'),
        port: configService.get('DBConfig.DB_PORT'),
        username: configService.get('DBConfig.DB_USER'),
        password: configService.get('DBConfig.DB_PASS'),
        database: configService.get('DBConfig.DB_NAME'),
        entities: [Trip],
        synchronize: true,
      }),
  },
];
