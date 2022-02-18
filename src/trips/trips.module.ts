import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { tripsProviders } from './trips.providers';
import { TripsService } from './trips.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TripsController],
  providers: [...tripsProviders, TripsService],
})
export class TripsModule {}
