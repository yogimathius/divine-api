import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async create(createUserInput: NewUserInput): Promise<User> {
    const { username, password, email } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    try {
      await this.userRepository.save(user);
      const savedUser = await this.findOneById(user.id);

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findBy(field: string, value: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
    });
    return user;
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { page, limit } = usersArgs;
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, data: Partial<User>): Promise<Partial<User>> {
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

  findUserSignIn(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
