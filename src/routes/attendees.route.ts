import { FastifyPluginAsync } from 'fastify';
// import { EventParticipant } from "../entities/eventParticipant.entity";
import { AttendeesService } from '../services/eventParticipant.service';

const attendees: FastifyPluginAsync = async (fastify, opts) => {
  const attendeesService = new AttendeesService(fastify.db);
  console.log(attendeesService);
  fastify.get('/events/:id/attendees', async (request, reply) => {});
};

export default attendees;
