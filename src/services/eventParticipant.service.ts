import { DataSource } from "typeorm";
import { EventParticipant } from "../entities/eventParticipant.entity";
// import { Event } from "../entities/events.entity";
// import { User } from "../entities/user.entity";

export class AttendeesService {
    private db: DataSource;

    constructor(db: DataSource) {
        this.db = db;
    }

    //Get all attendees
    async getAttendees () {
        const attendees = await this.db.getRepository(EventParticipant).find();
        return (`message: Hello ${attendees}`);
    }

    //Registration user
    async registerUser (){

    }

    //Unregistration
    async unregisterUser (){

    }
} 