import { DataSource } from "typeorm";
import { Points } from "../entities/points.entity";

const data = [
  {
    id: 1,
    userId: "user1",
    sourceType: "Event",
    sourceId: "event1",
    pointsEarned: 15,
    timestamp: new Date(),
  },
  {
    id: 2,
    userId: "user1",
    sourceType: "Challenge",
    sourceId: "challenge1",
    pointsEarned: 20,
    timestamp: new Date(),
  },
  {
    id: 3,
    userId: "user2",
    sourceType: "Event",
    sourceId: "event2",
    pointsEarned: 30,
    timestamp: new Date(),
  },
  {
    id: 4,
    userId: "user2",
    sourceType: "Challenge",
    sourceId: "challenge2",
    pointsEarned: 40,
    timestamp: new Date(),
  },
];

export class PointsService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  async getUserPoints(idUser: string) {
    return await this.db.getRepository(Points).find();
    const points = data
      .filter((point) => point.userId === idUser)
      .reduce((acc, point) => acc + point.pointsEarned, 0);
    return points;
  }

  async getUserPointsHistory(idUser: string) {
    return await this.db.getRepository(Points).find();
    const points = data.filter((point) => point.userId === idUser);
    if (points.length === 0) {
      throw new Error("User not found");
    }
    return points;
  }
}
