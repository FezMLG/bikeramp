import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from '../../constats';
import { Trip } from '../../database/schema/trip.entity';
import { getDayFromDate, getDayFromNum } from '../../utils';
import { Repository } from 'typeorm';
import { MonthlyStats } from '../interfaces/monthlystats.interface';
import { WeeklyStats } from '../interfaces/weeklystats.interface';

@Injectable()
export class StatsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
  ) {}

  async getWeeklyStats(): Promise<WeeklyStats> {
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

  async getMonthlyStats(): Promise<MonthlyStats[]> {
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