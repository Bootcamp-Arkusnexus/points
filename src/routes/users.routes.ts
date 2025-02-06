import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { UserService } from '../services/user.service';
import { request } from 'node:http';

const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }), 
});

const UpdateUserRequestSchema = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: 'email' })),
});

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.db);

  fastify.post('/users', {
    schema: {
      body: CreateUserRequestSchema,
    },
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      const { name, email } = request.body as { name: string; email: string };
      const existingUser = await userService.existsUserByEmail(email);
      if (existingUser)
        return reply.status(400).send({ message: 'Email is already in use.' });

      const user = await userService.createUser(name, email);

      reply.status(201).send(user);
    },
  });

  // GET /users
  fastify.get('/users', async (request, reply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
  });

  // GET /users/:id: 
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const user = await userService.getUserByID(id);
    if (!user) {
      return reply.status(404).send({ error: 'Usuario no encontrado' });
    }
    return reply.send(user);
  });
  

  // PUT /users/:id:
  fastify.put('/users/:id', {
    schema: {
      body: UpdateUserRequestSchema, 
    },
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      const { id } = request.params as { id: number };
      const userData = request.body as { name?: string; email?: string };

      const user = await userService.updateUser(id, userData);
      reply.send(user);
    },
  });

  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const userId = parseInt(id, 10);
  
      if (isNaN(userId)) {
        return reply.status(400).send({ message: "Invalid user ID." });
      }
  
      const userExists = await userService.existsUserByID(userId);
      if (!userExists) {
        return reply.status(404).send({ message: "User not found." });
      }
  
      await userService.deleteUser(userId);
      return reply.status(200).send({ message: "User deleted successfully." });
    } catch (error) {
      return reply.status(500).send({ message: "Internal server error.", error });
    }
  });  

  fastify.patch('/users/:id/status', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const userId = parseInt(id, 10);
  
      if (isNaN(userId)) {
        return reply.status(400).send({ message: "Invalid user ID." });
      }
  
      const { isActive } = request.body as { isActive: boolean };
  
      if (typeof isActive !== "boolean") {
        return reply.status(400).send({ message: "Invalid status. Must be true or false." });
      }
  
      const userExists = await userService.existsUserByID(userId);
      if (!userExists) {
        return reply.status(404).send({ message: "User not found." });
      }
  
      await userService.updateUser(userId, { isActive });
  
      return reply.status(200).send({ message: `User ${isActive ? 'activated' : 'deactivated'} successfully.` });
    } catch (error) {
      return reply.status(500).send({ message: "Internal server error.", error });
    }
  });
  
}

export default userRoutes;
