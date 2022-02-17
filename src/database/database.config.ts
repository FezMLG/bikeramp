import { registerAs } from '@nestjs/config';

// Configuration factory class for database configuration.
export const DatabaseConfig = registerAs('DBConfig', () => ({
  DBTYPE: process.env.DB_TYPE,
  DBHOST: process.env.DB_HOST || 'localhost',
  DBPORT: process.env.DB_PORT || 5432,
  DBUSERNAME: process.env.DB_USER,
  DBPASSWORD: process.env.DB_PASS,
  DBNAME: process.env.DB_NAME,
}));
