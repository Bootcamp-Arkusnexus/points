import { DataSource } from 'typeorm';
import { User } from './../entities/user.entity';
import { CustomError } from '../utils/handleError';

export class UserService {
  private db: DataSource;

  constructor(db: DataSource) {
    this.db = db;
  }

  async getAllUsers() {
    return await this.db.getRepository(User).find();
  }

  async getUserByID(id: number) {
    const user = await this.db.getRepository(User).findOne({ where: { id } });
    if (!user) throw new CustomError('User not found.', 404);
    return user;
  }

  async createUser(name: string, email: string) {
    const userRepository = this.db.getRepository(User);

    const user = userRepository.create({
      name,
      email,
      role: 'User',
    });
    await userRepository.save(user);

    return user;
  }

  async updateUser(id: number, userData: { name?: string; email?: string; isActive?: boolean;  role?: string }) {
    const userRepository = this.db.getRepository(User);
  
    const user = await this.getUserByID(id);
    if (!user) throw new CustomError('User not found.', 404);
  
    if (userData.email) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });
      if (existingUser && existingUser.id !== user.id) {
        throw new CustomError('Email is already in use.');
      }
    }
  
    await userRepository.update(id, userData);

    return await userRepository.findOne({ where: { id } });
  }
  
  /**
   *
   * Recive a email and return true if the user exists and false if not
   */
  async existsUserByEmail(email: string) {
    const user = await this.db
      .getRepository(User)
      .findOne({ where: { email } });
    if (user) return true;
    return false;
  }

  /**
   *
   * Recive a id and return true if the user exists and false if not
   */
  async existsUserByID(id: number) {
    const user = await this.db.getRepository(User).findOne({ where: { id } });
    if (user) return true;
    return false;
  }

  async deleteUser(id: number) {
    const userRepository = this.db.getRepository(User);
    await userRepository.delete(id);
  }
  
}