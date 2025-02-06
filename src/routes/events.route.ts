import { FastifyPluginAsync } from "fastify";
// import { Event } from "../entities/events.entity";
import { EventService } from "../services/event.service";


const events: FastifyPluginAsync = async (fastify, opts) => {
  const eventService = new EventService(fastify.db);

  fastify.get("/events", async (request, reply) => {
    const events = await eventService.getAllEvents();
    return reply.send(events);
  });

  fastify.get("/events/:id", async (request, reply) => {
    const { id } = request.params as { id: number };
    const event = await eventService.getEventByID(id);
    return reply.send(event);
  });

  fastify.post("/events", async (request, reply) => {
    const event = await eventService.createEvent(request.body as any);
    return reply.status(201).send(event);
  });
};

export default events;
