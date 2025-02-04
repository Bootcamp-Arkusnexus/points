import { FastifySchema } from 'fastify';

export const getBadgesCollectionSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          iconUrl: { type: 'string', format: 'uri', nullable: true },
          category: { type: 'string', nullable: true },
          type: {
            type: 'string',
            enum: ['bronze', 'silver', 'gold', 'platinum'],
          },
          points: { type: 'integer', minimum: 0 },
          isActive: { type: 'boolean' },
        },
        required: [
          'id',
          'name',
          'iconUrl',
          'category',
          'type',
          'points',
          'isActive',
        ],
      },
    },
  },
};

export const getBadgeByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        iconUrl: {
          anyOf: [{ type: 'string' }, { type: 'null' }],
        },
        category: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        type: {
          type: 'string',
          enum: ['bronze', 'silver', 'gold', 'platinum'],
        },
        criteria: {
          type: 'object',
          additionalProperties: true,
        },
        points: { type: 'integer', minimum: 0 },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      required: [
        'id',
        'name',
        'criteria',
        'points',
        'isActive',
        'createdAt',
        'updatedAt',
        'type',
      ],
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const createBadgeSchema = {
  body: {
    type: 'object',
    required: ['name', 'criteria'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 255 },
      description: { type: 'string', nullable: true, maxLength: 1000 },
      iconUrl: { type: 'string', format: 'uri', nullable: true },
      category: { type: 'string', nullable: true, maxLength: 100 },
      type: {
        type: 'string',
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        default: 'bronze',
      },
      criteria: { type: 'object' },
      points: { type: 'integer', minimum: 0, default: 0 },
      isActive: { type: 'boolean', default: true },
    },
  },
};
