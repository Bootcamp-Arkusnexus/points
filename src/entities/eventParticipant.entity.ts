import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Event } from "./events.entity";
import { User } from "./user.entity";

export enum EventParticipantStatus {
  ACTIVE = "Active",
  CANCELED = "Canceled",
  COMPLETED = "Completed",
}
@Entity()
export class EventParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.id, { onDelete: "CASCADE" })
  event: Event;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joinedAt: Date;

  @Column({
    type: "enum",
    enum: EventParticipantStatus,
    default: EventParticipantStatus.ACTIVE,
  })
  status: string;
}
