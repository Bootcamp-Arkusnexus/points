import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['eventID', 'user'])
export class Points {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  eventID: number;

  @Column({ nullable: false })
  pointsEarned: number;

  @Column({ default: 'event' })
  source: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
