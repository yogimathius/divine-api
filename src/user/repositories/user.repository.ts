import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NewUserInput } from '../dto/new-user.input';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from '../dto/update-user.input';

export class UserRepository extends Repository<User> {
  private logger = new Logger('UsersRepository', { timestamp: true });

  async createUser(createUserInput: NewUserInput): Promise<User> {
    const { username, password } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    this.logger.verbose(`user repo creating user ${JSON.stringify(user)}`);

    try {
      await this.save(user);
      const savedUser = this.getUser(user.id);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Userusername already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      this.logger.error(`Failed to get users`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getUser(id: number): Promise<User> {
    const query = this.createQueryBuilder('user');

    try {
      const user = await query.where('user.id = :id', { id }).getOne();
      console.log(user);

      return user;
    } catch (error) {
      this.logger.error(`Failed to get user`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async updateUserName(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { username } = updateUserInput;
    const query = this.createQueryBuilder('user');

    try {
      const user = await query.where('user.id = :id', { id }).getOne();
      user.username = username;
      await this.save(user);
      return user;
    } catch (error) {
      this.logger.error(`Failed to update user`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async removeUser(id: string): Promise<string> {
    const query = this.createQueryBuilder('user');
    this.logger.log(id);
    try {
      await query.delete().where('id = :id', { id }).execute();
      return `user with id ${id} has been removed`;
    } catch (error) {
      this.logger.error(`Failed to get user`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
