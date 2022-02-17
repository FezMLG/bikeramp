import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips/trips.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TripsModule, StatsModule],
})
export class AppModule {}
