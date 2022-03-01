import { Injectable } from '@nestjs/common';
import { StatsService } from './service/stats.service';
import {
  HealthIndicatorResult,
  HealthIndicator,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class StatsHealthIndicator extends HealthIndicator {
  constructor(private readonly statsService: StatsService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const monthlyStats = await this.statsService.getMonthlyStats();
    const units = 'km';
    const weeklyStats = await this.statsService.getWeeklyStats(units);
    const isHealthyMonthly = monthlyStats.length > 0;
    const isHealthyWeekly =
      'total_distance' in weeklyStats && 'total_price' in weeklyStats;

    const isStatsHealthy = isHealthyMonthly && isHealthyWeekly;

    const result = this.getStatus(key, isStatsHealthy, {
      monthlyStats: {
        status: isHealthyMonthly,
        length: monthlyStats.length,
      },
      weeklyStats: {
        status: isHealthyWeekly,
        weeklyStats,
      },
    });

    if (isHealthyMonthly) {
      return result;
    }
    throw new HealthCheckError('Statscheck failed', result);
  }
}
