import { Inject, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { stringify } from 'flatted';
import { TRIP_REPOSITORY } from 'src/constats';
import { Trip } from 'src/trips/trip.entity';
import { Between, Repository } from 'typeorm';
import { DailyStats, WeeklyStats } from './stats.interfaces';

@Injectable()
export class StatsService {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private tripRepository: Repository<Trip>,
  ) {}

  async getWeeklyStats() {
    let curr = new Date(); // get current date
    let first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    let firstday = format(new Date(curr.setDate(first)), 'yyyy-MM-dd');
    let lastday = format(new Date(curr.setDate(last)), 'yyyy-MM-dd');

    // const weeklyStats = await this.tripRepository.find({
    //   select: ['distance', 'price'],
    //   where: { date: Between(firstday, lastday) },
    // });
    const weeklyStats = await this.tripRepository
      .createQueryBuilder()
      .select('SUM(price)', 'total_price')
      .addSelect('SUM(distance)', 'total_distance')
      .where(`date BETWEEN '${firstday}' AND '${lastday}'`)
      .getRawOne();
    console.log(weeklyStats);
    return weeklyStats;
  }

  getMonthlyStats() {
    return { monthlyStats: {} };
  }
}
