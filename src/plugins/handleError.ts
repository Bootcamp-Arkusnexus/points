import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

export function handleError(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof CustomError) {
    return reply
      .status(error.code)
      .send({ statusCode: error.code, message: error.message });
  }
  reply.status(500).send({
    statusCode: 500,
    message: 'Internal Server Error',
  });
}

export class CustomError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = 'CustomError';
    this.code = code ?? 400;
  }
}
