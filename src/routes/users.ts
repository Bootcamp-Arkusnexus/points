import { FastifyPluginAsync } from 'fastify';
import { UserService } from '../services/user.service';
import { getUsersSchema } from '../schemas/user.schema';

const users: FastifyPluginAsync = async (fastify, opts) => {
  const userService = new UserService(fastify.db);

  fastify.get('/users', { schema: getUsersSchema }, async (request, reply) => {
    const users = await userService.getAllUsers();
    return reply.send(users);
  });
};

export default users;
