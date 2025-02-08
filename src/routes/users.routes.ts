import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { UserService } from '../services/user.service';

const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }), 
});

const UpdateUserRequestSchema = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: 'email' })),
});

const UpdateUserRoleRequestSchema = Type.Object({
  role: Type.String(),
  force: Type.Optional(Type.Boolean()),
});

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.db);

  fastify.post('/users', {
    schema: {
      body: CreateUserRequestSchema,
    },
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
  fastify.get('/users', {
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      const users = await userService.getAllUsers();
      reply.send(users);
    },
  });

  // GET /users/:id: 
  fastify.get('/users/:id', {
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      const { id } = request.params as { id: number };
      
      const userIdFromToken = (request.user as any).sub;
  
      if (parseInt(userIdFromToken, 10) === id) {
        const user = await userService.getUserByID(id);
        if (!user) {
          return reply.status(404).send({ error: 'User not found' });
        }
        return reply.send(user);
      }
  
      const userGroups = (request.user as any)['cognito:groups'];
      const isAdmin = userGroups && userGroups.includes('Admin');
      
      if (isAdmin) {
        const user = await userService.getUserByID(id);
        if (!user) {
          return reply.status(404).send({ error: 'User not found' });
        }
        return reply.send(user);
      }

      return reply.status(403).send({ message: 'Forbidden' });
    },
  });
  
  // PUT /users/:id:
  fastify.put('/users/:id', {
    schema: {
      body: UpdateUserRequestSchema,
    },
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      try {
        const { id } = request.params as { id: number };
        const userData = request.body as { name?: string; email?: string };

        const userIdFromToken = request.user?.sub;

        if (parseInt(userIdFromToken ?? '', 10) === id) {
          const user = await userService.updateUser(id, userData);
          return reply.status(200).send({ message: 'Profile updated successfully', user });
        }

        const userGroups = request.user?.['cognito:groups'];
        const isAdmin = userGroups && userGroups.includes('Admin');

        if (isAdmin) {
          const user = await userService.updateUser(id, userData);
          return reply.status(200).send({ message: 'User updated successfully', user });
        }

        return reply.status(403).send({ message: 'You are not authorized to edit this profile.' });
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error.', error });
      }
    },
  });

  fastify.put('/users/:id/role', {
    schema: {
      body: UpdateUserRoleRequestSchema,
    },
    preHandler: [fastify.authenticate], 
    async handler(request, reply) {
      try {
        const { id } = request.params as { id: number };
        const { role, force } = request.body as { role: string; force?: boolean };

        const userGroups = request.user?.['cognito:groups'];
        const isAdmin = userGroups && userGroups.includes('Admin');

        if (!isAdmin) {
          return reply.status(403).send({ message: 'You are not authorized to change roles.' });
        }

        const user = await userService.getUserByID(id);
        if (!user) {
          return reply.status(404).send({ message: 'User not found.' });
        }

        if (user.role === 'Admin' && role !== 'Admin' && !force) {
          return reply.status(400).send({
            message: 'You are trying to degrade an Admin. Please confirm by setting force to true.',
          });
        }

        await userService.updateUser(id, { role });

        reply.status(200).send({ message: 'User role updated successfully', user });
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error.', error });
      }
    }
  });

  fastify.delete('/users/:id', {
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
      try {
        const { id } = request.params as { id: string };
        const userId = parseInt(id, 10);
  
        if (isNaN(userId)) {
          return reply.status(400).send({ message: 'Invalid user ID.' });
        }
  
        const userIdFromToken = request.user?.sub;
  
        if (parseInt(userIdFromToken ?? '', 10) === userId) {
          await userService.deleteUser(userId);
          return reply.status(200).send({ message: 'Your account has been deleted successfully.' });
        }
  
        const userGroups = request.user?.['cognito:groups'];
        const isAdmin = userGroups && userGroups.includes('Admin');
  
        if (isAdmin) {
          const userExists = await userService.existsUserByID(userId);
          if (!userExists) {
            return reply.status(404).send({ message: 'User not found.' });
          }
  
          await userService.deleteUser(userId);
          return reply.status(200).send({ message: 'User deleted successfully.' });
        }
  
        return reply.status(403).send({ message: 'You are not authorized to delete this account.' });
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error.', error });
      }
    },
  });
  

  fastify.patch('/users/:id/status', {
    preHandler: [fastify.authenticate],
    async handler(request, reply) {
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
    },
  });
  
}

export default userRoutes;
