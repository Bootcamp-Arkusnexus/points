import { DataSource } from "typeorm";
import { Event } from "../entities/events.entity";

export class EventService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  async getAllEvents() {
    return await this.db.getRepository(Event).find();
  }

  async getEventByID(id: number): Promise<Event | null> {
    const badge = await this.db.getRepository(Event).findOne({ where: { id } });

    if (!badge) {
      return null;
    }

    return badge;
  }

  async createEvent(data: Partial<Event>): Promise<Event> {
    const existingEvent = await this.db
      .getRepository(Event)
      .findOne({ where: { title: data.title } });
    if (existingEvent) {
      throw new Error("Event already exists");
    }

    const newEvent = this.db.getRepository(Event).create({
      ...data,
      title: data.title,
      description: data.description, 
      date: data.date,
      category: data.category,
      location: data.location,
      createdBy: data.createdBy,
      points: data.points,
      capacity: data.capacity,
      registeredCount: data.registeredCount,
      status: data.status,
    });

    return this.db.getRepository(Event).save(newEvent);
  }
}
