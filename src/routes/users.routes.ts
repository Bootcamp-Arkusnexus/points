import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox'; // Importamos TypeBox para la validación
import { UserService } from '../services/user.service';

// Definimos el esquema para el cuerpo de la solicitud
const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }), // Validación del email
});

const UpdateUserRequestSchema = Type.Object({
  name: Type.Optional(Type.String()), // El nombre es opcional en la actualización
  email: Type.Optional(Type.String({ format: 'email' })), // El email es opcional en la actualización
});

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.db);

  fastify.post('/users', {
    schema: {
      body: CreateUserRequestSchema, // Asociamos el esquema con el cuerpo de la solicitud
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

  // GET /users: Obtener todos los usuarios
  fastify.get('/users', async (request, reply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
  });

  // GET /users/:id: Obtener un usuario por su ID
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const user = await userService.getUserByID(id);
    reply.send(user);
  });

  // PUT /users/:id: Actualizar un usuario por su ID
  fastify.put('/users/:id', {
    schema: {
      body: UpdateUserRequestSchema, // Asociamos el esquema con el cuerpo de la solicitud
    },
    async handler(request, reply) {
      const { id } = request.params as { id: number };
      const userData = request.body as { name?: string; email?: string };

      const user = await userService.updateUser(id, userData);
      reply.send(user);

      // reply.send(updatedUser);
    },
  });
}

export default userRoutes;
