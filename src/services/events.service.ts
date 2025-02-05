import { FastifyRequest, FastifyReply } from "fastify";


// Get all events
export const getAllEvents = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: 'All events' };
}

// Get event by ID
export const getEventByID = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "Getting event by ID" };
}

// Crete new event
export const newEvent = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "New event created" };
}

// Update an event by ID
export const updateEvent = async ( req: FastifyRequest,  reply: FastifyReply) => {
    return { message: "Event updated" };
}

// Delete event by ID
export const deleteEvent = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "Event deleted" };
}

// Register user to an Event
export const eventUserRegister = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "User registered to the event" }
}

// Unregister user to an Event
export const eventUserUnregister = async ( req: FastifyRequest, reply: FastifyReply) => {
    return { message: "User unregister successfully" }
}

// Send envites to an event
export const eventInvites = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "Invites sent successfully" }
}

// Get all attendees to an event
export const getAttendees = async ( req: FastifyRequest, reply: FastifyReply ) => {
    return { message: "Get all attendees" }
}