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

  async getUserByID(id: number) {
    const user = await this.db.getRepository(User).findOne( { where: { id } } );

    if(!user){
      throw new Error("User not found");
    }
    return user;
  }
}