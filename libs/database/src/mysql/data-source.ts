require('dotenv').config();
import { DataSource } from 'typeorm';
import MainEntities from './entities/Z-Index';
import MainMigrations from './migrations/Z-Index';

export const dataTaskManagerSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_MAIN_HOST,
  port: Number(process.env.MYSQL_MAIN_PORT),
  username: process.env.MYSQL_MAIN_USER,
  password: process.env.MYSQL_MAIN_PASS,
  database: process.env.MYSQL_MAIN_DB,
  timezone: 'Z',
  charset: 'utf8mb4',
  bigNumberStrings: false,
  entities: [...MainEntities],
  migrations: [...MainMigrations],
  subscribers: [],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  name: 'db1',
});
