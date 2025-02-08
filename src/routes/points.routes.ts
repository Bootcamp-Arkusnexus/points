import { FastifyPluginAsync } from 'fastify';
import { PointsService } from '../services/points.service';
import { getPointsSchema, postPointsSchema } from '../schemas/points.schema';
import {
  CreatePointsBodyType,
  GetPointsParamsType,
} from '../types/points.types';

const points: FastifyPluginAsync = async (fastify, opts) => {
  const pointsService = new PointsService(fastify.db);

  fastify.post<{ Body: CreatePointsBodyType }>(
    '/points',
    { schema: postPointsSchema },
    async (request, reply) => {
      const { userID, eventID, pointsEarned } = request.body;
      const points = await pointsService.createPoints(
        userID,
        eventID,
        pointsEarned
      );
      return reply.code(201).send(points);
    }
  );

  fastify.get<{ Params: GetPointsParamsType }>(
    '/users/:idUser/points',
    { schema: getPointsSchema },
    async (request, reply) => {
      const { userID } = request.params;
      const points = await pointsService.getUserPoints(userID);
      return reply.send(points);
    }
  );

  fastify.get<{ Params: GetPointsParamsType }>(
    '/users/:idUser/points/history',
    {},
    async (request, reply) => {
      const { userID } = request.params;
      const history = await pointsService.getUserPointsHistory(userID);
      console.log(history);
      return reply.send(history);
    }
  );
};

export default points;
