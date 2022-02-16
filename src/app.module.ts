import { Module } from '@nestjs/common';
import { TripsController } from './trips/trips.controller';
import { StatsController } from './stats/stats.controller';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [TripsModule, StatsModule],
})
export class AppModule {}
