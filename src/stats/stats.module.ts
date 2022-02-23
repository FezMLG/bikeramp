import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/schema/trip.entity';
import { StatsController } from './controller/stats.controller';
import { StatsService } from './service/stats.service';
import { StatsHealthIndicator } from './stats.health';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [StatsController],
  providers: [StatsService, StatsHealthIndicator],
  exports: [StatsHealthIndicator],
})
export class StatsModule {}
