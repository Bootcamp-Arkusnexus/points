import { DataSource } from "typeorm";
import { Event } from "../entities/events.entity";

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
    const badge = await this.db.getRepository(Event).findOne({ where: { id } });

    if (!badge) {
      return null;
    }

    return badge;
  }

  //Create events
  async createEvent(data: Partial<Event>): Promise<Event> {
    const existingEvent = await this.db
      .getRepository(Event)
      .findOne({ where: { title: data.title } });
    if (existingEvent) {
      throw new Error("Event already exists");
    }
    const newEvent = this.db.getRepository(Event).create({ ...data });
    return await this.db.getRepository(Event).save(newEvent);
  }

  //Update events
  async updateEvent(id: number, data: Partial<Event>) {
    const eventExist = await this.db
      .getRepository(Event)
      .findOne({ where: { id: data.id } });
    console.log(eventExist);

    await this.db.getRepository(Event).update(id, { ...data });

    return await this.db.getRepository(Event).findOne({ where: { id } });
  }

  //Delete events
  async deleteEvents(id: number) {
    const event = await this.db.getRepository(Event).findOne({ where: { id } });
    if (!event) {
      return null;
    }
    return await this.db.getRepository(Event).delete(id);
  }
}
