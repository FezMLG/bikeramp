import { Module } from '@nestjs/common';
import { TripsController } from './controller/trips.controller';
import { TripsService } from './service/trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../schema/trip.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService, ConfigService],
})
export class TripsModule {}
