import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Event } from "./events.entity";
@Entity()
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}