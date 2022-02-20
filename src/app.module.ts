import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database/database.config';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema,
      load: [DatabaseConfig],
    }),
    TripsModule,
    StatsModule,
  ],
})
export class AppModule {}
