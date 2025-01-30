import fp from 'fastify-plugin';
import { DataSource } from 'typeorm';
import AppDataSource from '../database/typeorm.config';

export default fp(async (fastify) => {
  try {
    await AppDataSource.initialize();
    fastify.decorate('db', AppDataSource);
    fastify.log.info('Database connected successfully!');
  } catch (err) {
    fastify.log.error(`Database connection error: ${err}`);
    process.exit(1);
  }
});

// Extend Fastify's types to include the "db" instance
declare module 'fastify' {
  export interface FastifyInstance {
    db: DataSource;
  }
}
