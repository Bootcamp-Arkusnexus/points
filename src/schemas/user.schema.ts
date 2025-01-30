import { FastifySchema } from 'fastify';

export const getUsersSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          email: { type: 'string' },
          isActive: { type: 'boolean' },
        },
      },
    },
  },
};
