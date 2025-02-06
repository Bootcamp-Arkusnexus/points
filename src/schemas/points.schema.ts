import { FastifySchema } from "fastify";

export const getPointsSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      idUser: { type: "string" },
    },
    required: ["idUser"],
  },
  response: {
    200: {
      type: "number",
    },
  },
};

export const getPointsHistorySchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      idUser: { type: "string" },
    },
    required: ["idUser"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          userId: { type: "string" },
          sourceType: { type: "string" },
          sourceId: { type: "string" },
          pointsEarned: { type: "number" },
          timestamp: { type: "string" },
        },
      },
    },
  },
};

export type GetPointsParams = {
  idUser: string;
};
