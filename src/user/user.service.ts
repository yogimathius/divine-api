import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    return await this.userRepository.save(data);
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { page, limit } = usersArgs;
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const userFound = await this.userRepository.findOneBy({ id });
    if (!userFound) {
      return false;
    }
    const result = await this.userRepository.delete(id);

    return result.affected > 0;
  }
}
