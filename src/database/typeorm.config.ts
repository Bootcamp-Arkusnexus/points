import { DataSource } from 'typeorm';
import { join } from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'points',
  entities: [join(__dirname, './../entities/*.entity.{js,ts}')],
  migrations: [join(__dirname, './migrations/*.{js,ts}')],
  synchronize: false, // Use migrations instead of auto-sync
  logging: true,
});

export default AppDataSource;
