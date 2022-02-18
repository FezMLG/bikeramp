import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tripsProviders } from '../trips/trips.providers';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatsController],
  providers: [...tripsProviders, StatsService],
})
export class StatsModule {}
