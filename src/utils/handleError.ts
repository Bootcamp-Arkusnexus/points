import { FastifyError } from 'fastify';
import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

export function handleError(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof CustomError) {
    return reply
      .status(error.code)
      .send({ statusCode: error.code, message: error.message });
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      statusCode: 400,
      message: error.message,
    });
  }

  if ((error as any).validation) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Validation Error',
      errors: error.message,
    });
  }

  console.error(error);
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
