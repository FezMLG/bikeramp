import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';

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
  ],
})
export class AppModule {}
