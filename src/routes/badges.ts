import { FastifyPluginAsync } from 'fastify';

import { BadgeService } from '../services/badge.service';
import { Badge } from '../entities/badge.entity';
import {
  createBadgeSchema,
  getBadgeByIdSchema,
  getBadgesCollectionSchema,
} from '../schemas/badge.schema';

const badges: FastifyPluginAsync = async (fastify, opts) => {
  const badgeService = new BadgeService(fastify.db);

  fastify.get(
    '/badges',
    { schema: getBadgesCollectionSchema },
    async (request, reply) => {
      const badges = await badgeService.getAllBadges();
      return reply.send(badges);
    },
  );

  fastify.get(
    '/badges/:id',
    { schema: getBadgeByIdSchema },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const badge = await badgeService.getBadgeById(id);

      if (!badge) {
        return reply
          .status(404)
          .send({ error: 'Not Found', message: 'Badge not found' });
      }

      return reply.send(badge);
    },
  );

  fastify.post(
    '/badges',
    { schema: createBadgeSchema },
    async (request, reply) => {
      try {
        const badge = await badgeService.createBadge(
          request.body as Partial<Badge>,
        );
        return reply.status(201).send(badge);
      } catch (error) {
        fastify.log.error(error);
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        return reply.status(400).send({ error: errorMessage });
      }
    },
  );
};

export default badges;
