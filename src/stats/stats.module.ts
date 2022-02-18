import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tripsProviders } from 'src/trips/trips.providers';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatsController],
  providers: [...tripsProviders, StatsService],
})
export class StatsModule {}
