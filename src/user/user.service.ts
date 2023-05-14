import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {
    this.logger = new Logger('sign in controller');
  }

  async create(createUserInput: NewUserInput): Promise<User> {
    const { username, password } = createUserInput;
    this.logger.verbose(
      `user create hit with ${JSON.stringify({ username, password })}`,
    );
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    this.logger.verbose(`after create user ${JSON.stringify(user)}`);

    try {
      await this.userRepository.save(user);
      const savedUser = await this.findOneById(user.id);
      this.logger.verbose(`saving user ${JSON.stringify(savedUser)}`);
      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        this.logger.error('bad juju in createUser method: ', error);
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
    this.logger.log('findAll query hit with: ', page, limit);
    return this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    this.logger.verbose('updating user with: ', data);

    const response = await this.userRepository.update(id, data);
    this.logger.verbose('updating user: ', response);
    const updatedUser = await this.findOneById(id);
    this.logger.verbose('user updated: ', updatedUser);
    return updatedUser;
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
