import { DataSource } from 'typeorm';
import { User } from './../entities/user.entity';

export class UserService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  async getAllUsers() {
    return await this.db.getRepository(User).find();
  }
}
