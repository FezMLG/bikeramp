import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/schema/trip.entity';
import { StatsModule } from 'src/stats/stats.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    TerminusModule,
    HttpModule,
    StatsModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
