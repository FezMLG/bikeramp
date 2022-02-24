import { Inject, Injectable } from '@nestjs/common';
import { TRIP_REPOSITORY } from '../../constats';
import { Trip } from '../../schema/trip.entity';
import { getDayFromDate, getDayFromNum } from '../../utils';
import { getRepository, Repository } from 'typeorm';
import { MonthlyStats } from '../interfaces/monthlystats.interface';
import { WeeklyStats } from '../interfaces/weeklystats.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  async getWeeklyStats(): Promise<WeeklyStats> {
    let date = new Date();
    let firstDay = date.getDate() - date.getDay() + 1;
    let lastDay = firstDay + 6;

    const weeklyStats = await this.tripRepository
      .createQueryBuilder()
      .select(`COALESCE(SUM(distance)/100, 0)||'km'`, `total_distance`)
      .addSelect(`COALESCE(SUM(price), 0)||'PLN'`, `total_price`)
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
      .addSelect(`COALESCE(SUM(distance)/100, 0)||'km'`, 'total_distance')
      .addSelect(
        `ROUND((COALESCE(AVG(distance), 0)/100)::numeric, 2)||'km'`,
        'avg_ride',
      )
      .addSelect(
        `ROUND(COALESCE(AVG(price), 0)::numeric, 2)||'PLN'`,
        'avg_price',
      )
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
