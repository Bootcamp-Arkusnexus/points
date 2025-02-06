import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Event } from "./events.entity";

// Entidad de categorías de eventos
@Entity()
export class EventCategory {
  @PrimaryGeneratedColumn() // ID autoincremental
  id: number;

  @Column({ unique: true, length: 50 }) // Nombre único de la categoría
  name: string;

  @OneToMany(() => Event, (event) => event.category) // Relación uno a muchos con eventos
  events: Event[];
}
