import { FastifySchema } from 'fastify';
import {
  CreatePointsBody,
  GetPointsParams,
  PointsTypeBox,
} from '../types/points.types';
import { Type } from '@sinclair/typebox';

export const getPointsSchema: FastifySchema = {
  params: GetPointsParams,
  response: {
    200: {
      type: 'number',
    },
  },
};

export const getPointsHistorySchema: FastifySchema = {
  params: GetPointsParams,
  response: {
    200: {
      type: 'array',
      items: PointsTypeBox,
    },
  },
};

export const postPointsSchema: FastifySchema = {
  body: CreatePointsBody,
  response: {
    201: Type.Omit(PointsTypeBox, ['user']),
  },
};
