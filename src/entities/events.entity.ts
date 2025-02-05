import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { EventCategory } from "./eventCategory.entity";

// Entidad de eventos
@Entity()
export class Event {
  @PrimaryGeneratedColumn() // ID autoincremental
  id: number;

  @Column({ length: 255 }) // Título del evento
  title: string;

  @Column({ type: "text", nullable: true }) // Descripción opcional del evento
  description?: string;

  @Column() // Fecha y hora del evento
  date: Date;

  @ManyToOne(() => EventCategory, (category) => category.events, {
    nullable: false,
    onDelete: "RESTRICT",
  }) // Relación con la categoría del evento
  category: EventCategory;

  @Column({ type: "text", nullable: true }) // Ubicación del evento
  location?: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" }) // Creador del evento, puede ser nulo si el usuario es eliminado
  createdBy?: User;

  @Column({ default: 0 }) // Puntos que otorga el evento
  points: number;

  @Column({ default: 0 }) // Capacidad máxima del evento
  capacity: number;

  @Column({ default: 0 }) // Cantidad de personas registradas
  registeredCount: number;

  @Column({ length: 50, default: "Active" }) // Estado del evento
  status: string;

  @Column({ type: "timestamp", nullable: true, default: null }) // Fecha de eliminación (soft delete)
  deletedAt?: Date;

  @CreateDateColumn() // Fecha de creación automática
  createdAt: Date;

  @UpdateDateColumn() // Fecha de actualización automática
  updatedAt: Date;
}
