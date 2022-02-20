import { registerAs } from '@nestjs/config';

// Configuration factory class for database configuration.
export const DatabaseConfig = registerAs('DBConfig', () => ({
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
}));
