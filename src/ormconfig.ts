import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Trip } from './schema/trip.entity';
import 'dotenv/config';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Trip],
  // entities: ["dist/src/**/*.entity.js"],
  synchronize: true,
  migrations: ['dist/src/db/migrations*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
