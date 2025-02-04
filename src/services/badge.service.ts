import { DataSource } from 'typeorm';
import { Badge } from '../entities/badge.entity';

export class BadgeService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  async getAllBadges() {
    return await this.db.getRepository(Badge).find();
  }

  async getBadgeById(id: string): Promise<Badge | null> {
    const badge = await this.db.getRepository(Badge).findOne({ where: { id } });

    if (!badge) {
      return null;
    }

    return badge;
  }

  async createBadge(data: Partial<Badge>): Promise<Badge> {
    const existingBadge = await this.db.getRepository(Badge).findOne({
      where: { name: data.name },
    });
    if (existingBadge) {
      throw new Error('Badge with this name already exists.');
    }

    const newBadge = this.db.getRepository(Badge).create({
      ...data,
      points: data.points ?? 0,
      isActive: data.isActive ?? true,
    });

    return this.db.getRepository(Badge).save(newBadge);
  }
}
