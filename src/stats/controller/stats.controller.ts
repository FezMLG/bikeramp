import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatsService } from '../service/stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  getWeeklyStats(@Query('units') units: string): Object {
    return this.statsService.getWeeklyStats(units);
  }

  @Get('monthly')
  getMonthlyStats(): Object {
    return this.statsService.getMonthlyStats();
  }
}
