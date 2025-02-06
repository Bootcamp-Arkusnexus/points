import { FastifyPluginAsync } from 'fastify'
import data from './../../build-info.json'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/build-info', async function (request, reply) {
    return JSON.stringify(data, null, 2);
  });
}

export default root;
