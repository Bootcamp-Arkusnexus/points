import { FastifyPluginAsync } from "fastify";
import { PointsService } from "../services/points.service";
import { GetPointsParams, getPointsSchema } from "../schemas/points.schema";

const points: FastifyPluginAsync = async (fastify, opts) => {
  const pointsService = new PointsService(fastify.db);

  fastify.get<{ Params: GetPointsParams }>(
    "/users/:idUser/points",
    { schema: getPointsSchema },
    async (request, reply) => {
      const { idUser } = request.params;
      const points = await pointsService.getUserPoints(idUser);
      return reply.send(points);
    }
  );

  fastify.get<{ Params: GetPointsParams }>(
    "/users/:idUser/points/history",
    {},
    async (request, reply) => {
      const { idUser } = request.params;
      const history = await pointsService.getUserPointsHistory(idUser);
      return reply.send(history);
    }
  );
};

export default points;
