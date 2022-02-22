import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Trip } from './schema/trip.entity';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: '192.168.8.151',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'nestjs',
  entities: [Trip],
  // entities: ["dist/src/**/*.entity.js"],
  synchronize: true,
  migrations: ['dist/src/db/migrations*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
