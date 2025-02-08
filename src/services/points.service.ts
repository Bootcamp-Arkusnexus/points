import { DataSource, Repository } from 'typeorm';
import { Points } from '../entities/points.entity';
import { UserService } from './user.service';
import { EventService } from './event.service';
import { CustomError } from '../utils/handleError';
// import { User } from '../entities/user.entity';

export class PointsService {
  // private db: DataSource;
  private userService: UserService;
  private eventService: EventService;
  private pointsRepository: Repository<Points>;

  constructor(db: DataSource) {
    // this.db = db;
    this.userService = new UserService(db);
    this.eventService = new EventService(db);
    this.pointsRepository = db.getRepository(Points);
  }

  async createPoints(userID: number, eventID: number, pointsEarned: number) {
    const event = await this.eventService.getEventByID(eventID);
    const user = await this.userService.getUserByID(userID);
    if (!event) throw new CustomError('Event not found', 404);
    // TODO: event state validation and event_participant validation
    await this.existsPoints(userID, eventID);

    const points = this.pointsRepository.create({
      user,
      eventID,
      pointsEarned,
    });

    await this.pointsRepository.save(points);
    return points;
  }

  async getUserPoints(idUser: number) {
    // const user = await this.userService.getUserByID(idUser);
    // const points = user.totalPoints;

    // return { points };
    // return (await this.userService.getUserByID(idUser)).totalPoints;
    return { points: 30 };
  }

  async getUserPointsHistory(userID: number) {
    try {
      return await this.pointsRepository.find({
        select: {
          id: true,
          pointsEarned: true,
          user: { id: true },
          eventID: true,
          timestamp: true,
          source: true,
        },
        relations: ['user'],
        where: { user: { id: userID } },
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async existsPoints(userID: number, eventID: number) {
    const points = await this.pointsRepository.findOne({
      where: { user: { id: userID }, eventID },
    });
    console.log('--------------------------------------------------------');
    console.log(userID, eventID);
    console.log(points);
    if (points) throw new CustomError('Points already exists', 400);
    return false;
  }
}
