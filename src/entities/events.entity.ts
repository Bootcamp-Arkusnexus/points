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

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column()
  date: Date;

  @ManyToOne(() => EventCategory, (category) => category.events, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  category: EventCategory;

  @Column({ type: "text", nullable: true })
  location?: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" })
  createdBy?: User;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  capacity: number;

  @Column({ default: 0 })
  registeredCount: number;

  @Column({ length: 50, default: "Active" })
  status: string;

  @Column({ type: "timestamp", nullable: true, default: null })
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
