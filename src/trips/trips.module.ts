import { Module } from '@nestjs/common';
import { TripsController } from './controller/trips.controller';
import { TripsService } from './service/trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/schema/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
