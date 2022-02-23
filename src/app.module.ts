import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(ormConfig),
    TripsModule,
    StatsModule,
    HealthModule,
  ],
})
export class AppModule {}
