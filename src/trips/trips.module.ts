import { Module } from '@nestjs/common';
import { TripsController } from './controller/trips.controller';
import { tripsProviders } from './trips.providers';
import { TripsService } from './service/trips.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TripsController],
  providers: [...tripsProviders, TripsService],
})
export class TripsModule {}
