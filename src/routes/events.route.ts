import { FastifyPluginAsync } from "fastify";
import { Event } from "../entities/events.entity";
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
    try {
      const event = await eventService.createEvent(request.body as Partial<Event>);
      return reply.status(201).send(event);
    } catch (error) {
      return;
    }
  });

  fastify.put("/events/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const body = request.body as Partial<Event>;

      const event = await eventService.updateEvent(id, body);
      return reply.status(201).send({ message: event });
    } catch (error) {
      return reply.status(404).send({ message: "Event not found" });
    }
  });

  fastify.delete("/events/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const event = await eventService.deleteEvents(id);
      return event;
    } catch (error) {
      //Pending
    }
  });
};

export default events;
