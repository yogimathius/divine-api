import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        UserResolver,
        UserService,
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('user', () => {
    it('should return a user by id', async () => {
      const expectedUser: User = {
        id: 1,
        name: 'New User',
        email: 'test@test.ca',
        password: '123456',
      };
      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedUser);

      const result = await resolver.user(1);

      expect(service.findOneById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('users', () => {
    it('should return a list of users', async () => {
      const expectedUsers: User[] = [
        {
          id: 1,
          name: 'New User',
          email: 'test@test.ca',
          password: '123456',
        },
        {
          id: 2,
          name: 'New User',
          email: 'test@test.ca',
          password: '123456',
        },
        {
          id: 3,
          name: 'New User',
          email: 'test@test.ca',
          password: '123456',
        },
      ];
      const usersArgs: UsersArgs = { page: 1, limit: 10 };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedUsers);

      const result = await resolver.users(usersArgs);

      expect(service.findAll).toHaveBeenCalledWith(usersArgs);
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserData: NewUserInput = {
        id: 1,
        name: 'New User',
        email: 'test@test.ca',
        password: '123456',
      };
      const expectedUser: User = { id: 1, ...newUserData };
      jest.spyOn(service, 'create').mockResolvedValue(expectedUser);

      const result = await resolver.createUser(newUserData);

      expect(service.create).toHaveBeenCalledWith(newUserData);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updateUserInput: UpdateUserInput = {
        id: userId,
        name: 'New User',
        email: 'test@test.ca',
        password: '123456',
      };
      const expectedUser: User = { id: userId, ...updateUserInput };
      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await resolver.updateUser(userId, updateUserInput);

      expect(service.update).toHaveBeenCalledWith(userId, updateUserInput);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // Create a new user to delete
      const newUser: NewUserInput = {
        id: 1,
        name: 'New User',
        email: 'test@test.ca',
        password: '123456',
      };
      jest.spyOn(repository, 'save').mockResolvedValue({ id: 1, ...newUser });

      const user = await service.create(newUser);
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(user);

      const mockDeleteResult = { affected: 1, raw: null };
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);
      // Call the deleteUser mutation
      const deleted = await resolver.deleteUser(user.id);

      // Check that the user was deleted
      expect(deleted).toBe(true);
      expect(await service.findOneById(user.id)).toBeUndefined();
    });
  });
});
