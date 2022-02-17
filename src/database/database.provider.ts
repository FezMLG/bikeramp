import { createConnection } from 'typeorm';
import {
  DATABASE_CONNECTION,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from 'src/constats';
import { ConfigService } from '@nestjs/config';
import { Trip } from 'src/trips/trips.entity';

export const databaseProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) =>
      // console.log(configService);
      // await createConnection({
      //   type: 'postgres',
      //   host: configService.get('DB_HOST'),
      //   port: configService.get('DBConfig.DB_PORT'),
      //   username: configService.get('DBConfig.DB_USER'),
      //   password: configService.get('DBConfig.DB_PASS'),
      //   database: configService.get('DBConfig.DB_NAME'),
      //   entities: [Trip],
      //   synchronize: true,
      // }),
      await createConnection({
        type: 'postgres',
        host: '192.168.8.151',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'nestjs',
        entities: [Trip],
        synchronize: true,
      }),
  },
];
