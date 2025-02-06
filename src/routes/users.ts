import { FastifyInstance } from 'fastify';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { Type } from '@sinclair/typebox';  // Importamos TypeBox para la validación

// Definimos el esquema para el cuerpo de la solicitud
const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }),  // Validación del email
});

const UpdateUserRequestSchema = Type.Object({
  name: Type.Optional(Type.String()),  // El nombre es opcional en la actualización
  email: Type.Optional(Type.String({ format: 'email' })),  // El email es opcional en la actualización
});

export async function userRoutes(fastify: FastifyInstance) {
  // POST /users: Crear un nuevo usuario
  fastify.post('/users', {
    schema: {
      body: CreateUserRequestSchema,  // Asociamos el esquema con el cuerpo de la solicitud
    },
    async handler(request, reply) {
      const { name, email } = request.body as { name: string; email: string };

      // Validación básica de campos
      if (!name || !email) {
        return reply.status(400).send({ message: 'Name and email are required.' });
      }

      const userRepository = getRepository(User);

      // Verificar si el email ya existe
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return reply.status(400).send({ message: 'Email is already in use.' });
      }

      // Crear el nuevo usuario
      const user = userRepository.create({
        name,
        email,
        isActive: true,
        role: 'User',
        totalPoints: 0,
        level: 1,
      });
      await userRepository.save(user);

      reply.status(201).send(user);
    },
  });

  // GET /users: Obtener todos los usuarios
  fastify.get('/users', async (request, reply) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    reply.send(users);
  });

  // GET /users/:id: Obtener un usuario por su ID
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      return reply.status(404).send({ message: 'User not found.' });
    }

    reply.send(user);
  });

  // PUT /users/:id: Actualizar un usuario por su ID
  fastify.put('/users/:id', {
    schema: {
      body: UpdateUserRequestSchema,  // Asociamos el esquema con el cuerpo de la solicitud
    },
    async handler(request, reply) {
      const { id } = request.params as { id: string };
      const userData = request.body as { name?: string; email?: string };

      const userRepository = getRepository(User);

      // Verificar si el usuario existe
      const user = await userRepository.findOne({ where: { id: Number(id) } });
      if (!user) {
        return reply.status(404).send({ message: 'User not found.' });
      }

      // Verificar si el email ya está en uso
      if (userData.email) {
        const existingUser = await userRepository.findOne({ where: { email: userData.email } });
        if (existingUser && existingUser.id !== user.id) {
          return reply.status(400).send({ message: 'Email is already in use.' });
        }
      }

      // Actualizar los datos del usuario
      await userRepository.update(Number(id), userData);

      // Obtener el usuario actualizado y devolverlo
      const updatedUser = await userRepository.findOne({ where: { id: Number(id) } });
      reply.send(updatedUser);
    },
  });
}
