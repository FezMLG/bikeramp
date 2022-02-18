import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from 'src/constats';
import { Trip } from 'src/trips/trip.entity';
import { getDayFromDate, getDayFromNum } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
  ) {}

  async getWeeklyStats() {
    let date = new Date();
    let firstDay = date.getDate() - date.getDay() + 1;
    let lastDay = firstDay + 6;

    const weeklyStats = await this.tripRepository
      .createQueryBuilder()
      .select(`SUM(distance)/100||'km'`, `total_distance`)
      .addSelect(`SUM(price)||'PLN'`, `total_price`)
      .where(
        `date BETWEEN '${getDayFromNum(firstDay)}' AND '${getDayFromNum(
          lastDay,
        )}'`,
      )
      .getRawOne();
    return weeklyStats;
  }

  async getMonthlyStats() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthlyStats = await this.tripRepository
      .createQueryBuilder()
      .select(`to_char(date, 'FMMonth, DDth')`, 'date')
      .addSelect(`SUM(distance)||'km'`, 'total_distance')
      .addSelect(`AVG(distance)/100||'km'`, 'avg_ride')
      .addSelect(`AVG(price)||'PLN'`, 'avg_price')
      .where(
        `date BETWEEN '${getDayFromDate(firstDay)}' AND '${getDayFromDate(
          lastDay,
        )}'`,
      )
      .groupBy('date')
      .getRawMany();
    return monthlyStats;
  }
}
