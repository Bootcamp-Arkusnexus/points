import { DataSource } from 'typeorm';
import { Event } from '../entities/events.entity';

export class EventService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  //Get all events
  async getAllEvents() {
    return await this.db.getRepository(Event).find();
  }

  //Get event by ID
  async getEventByID(id: number): Promise<Event | null> {
    const event = await this.db.getRepository(Event).findOne({ where: { id } });
    if (!event) {
      throw new Error ('Event not found');
    }
    return event;
  }

  //Create events
  async createEvent(data: Partial<Event>): Promise<Event> {
    // Find event by ID
    const existingEvent = await this.db
      .getRepository(Event)
      .findOne({ where: { title: data.title } });
    
    // Check if event already exist
    if (existingEvent) {
      throw new Error('Event already exists');
    }

    // Create the event
    const newEvent = this.db.getRepository(Event).create({ ...data });
    
    // Save the event
    return await this.db.getRepository(Event).save(newEvent);
  }

  //Update events
  async updateEvent(id: number, data: Partial<Event>) {
    // Find event
    const eventExist = await this.db
      .getRepository(Event)
      .findOne({ where: { id } });
    
    // Check if event exist
    if(!eventExist){
      throw new Error("Event not found");
    }

    // Update the event
    await this.db.getRepository(Event).update(id, { ...data });

    // Find updated event
    const updatedEvent = await this.db.getRepository(Event).findOne({ where: { id } });

    // Return updated event
    return updatedEvent;
  }

  //Delete events
  async deleteEvents(id: number) {
    // Find event by ID
    const event = await this.db.getRepository(Event).findOne({ where: { id } });

    // Check if event exists
    if (!event) {
      throw new Error("Event not found");
    }

    // Delete event
    await this.db.getRepository(Event).delete(id);

    // Return event deleted
    return event.title;
  }
}
