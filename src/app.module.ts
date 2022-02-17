import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips/trips.entity';
import { Connection } from 'typeorm';
import { DatabaseConfig } from './database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [DatabaseConfig],
    }),
    TripsModule,
    StatsModule,
  ],
})
export class AppModule {}
