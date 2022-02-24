import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { StatsHealthIndicator } from '../stats/stats.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private statsHealthIndicator: StatsHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
      async () => this.statsHealthIndicator.isHealthy('stats'),
      async () =>
        this.http.pingCheck('Google Maps API', 'https://maps.googleapis.com'),
    ]);
  }
}
