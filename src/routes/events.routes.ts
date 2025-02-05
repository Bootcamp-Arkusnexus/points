import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import {
  getAllEvents,
  getEventByID,
  newEvent,
  updateEvent,
  deleteEvent,
  eventUserRegister,
  eventUserUnregister,
  eventInvites,
  getAttendees,
} from "../services/events.service";

const events = (app: FastifyInstance) => {
  //Get all events
  app.get("/events", getAllEvents);

  //Get events by ID
  app.get("/events/:id", getEventByID);

  //Create Event
  app.post("/events", newEvent);

  //Update event
  app.put("/events/:id", updateEvent);

  //Delete event
  app.delete("/events/:id", deleteEvent);

  // Register user to an Event
  app.post("/events/:id/register", eventUserRegister);

  // Unregister user to an Event
  app.post("/events/:id/unregister", eventUserUnregister);

  // Send envites to an event
  app.post("/events/:id/invite", eventInvites);

  // Get all attendees to an event
  app.get("/events/:id/attendees", getAttendees);
};

export default fastifyPlugin(events);