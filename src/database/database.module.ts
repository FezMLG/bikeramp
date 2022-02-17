import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/database/database.provider';

@Module({
  imports: [],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
