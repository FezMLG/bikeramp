import { Injectable } from '@nestjs/common';

@Injectable()
export class StatsService {
  getWeeklyStats() {
    return { weeklyStats: {} };
  }

  getMonthlyStats() {
    return { monthlyStats: {} };
  }
}
