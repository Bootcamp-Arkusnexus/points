import { FastifyPluginAsync } from 'fastify';
import { UserService } from '../services/user.service';
import { getUsersSchema } from '../schemas/user.schema';

const users: FastifyPluginAsync = async (fastify, opts) => {
  const userService = new UserService(fastify.db);

  fastify.get('/users', { schema: getUsersSchema }, async (request, reply) => {
    const users = await userService.getAllUsers();
    return reply.send(users);
  });

  fastify.get('/users/:id', async (request, reply) => {
   try{
    const { id } = request.params as { id: number };
    const user = await userService.getUserByID(id);
    return reply.status(200).send(user);
   } catch (error){
    return reply.status(404).send({ message: "User does not exist" })
   }
  })
};

export default users;