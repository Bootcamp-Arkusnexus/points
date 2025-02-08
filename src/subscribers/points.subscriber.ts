import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Points } from '../entities/points.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Points> {
  listenTo() {
    return Points;
  }

  async afterInsert(event: InsertEvent<Points>) {
    try {
      const user = event.entity.user;
      user.totalPoints += event.entity.pointsEarned;
      await event.manager.save(user);
    } catch (error) {
      console.log(error);
    }
  }
}
