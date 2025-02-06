import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Points {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userID: number;

  @Column()
  eventID: number;

  @Column({ nullable: false })
  pointsEarned: number;

  @Column({ default: "event" })
  source: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}
