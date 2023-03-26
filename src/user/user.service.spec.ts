import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      const newUser = {
        id: 1,
        username: 'User 1',
        email: 'test@test.cq',
        password: '123456',
        enabled: true,
      };
      jest.spyOn(repository, 'create').mockReturnValue(newUser);

      jest.spyOn(repository, 'save').mockResolvedValue(newUser);
      jest.spyOn(service, 'findOneById').mockResolvedValue(newUser);
      const result = await service.create(newUser);

      expect(repository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('findOneById', () => {
    it('should find a user by id', async () => {
      const expectedUser = {
        id: 1,
        username: 'User 1',
        email: 'test@test.cq',
        password: '123456',
        enabled: true,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedUser);

      const result = await service.findOneById(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should find all users with pagination', async () => {
      const users = [
        {
          id: 1,
          username: 'User 1',
          email: 'test@test.cq',
          password: '123456',
          enabled: true,
        },
        {
          id: 2,
          username: 'User 2',
          email: 'test@test.cq',
          password: '123456',
          enabled: true,
        },
        {
          id: 3,
          username: 'User 3',
          email: 'test@test.cq',
          password: '123456',
          enabled: true,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(repository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(users);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const updatedUser = {
        id: 1,
        username: 'User 1',
        email: 'test@test.cq',
        password: '123456',
        enabled: true,
      };
      const expectedUser = { id: 1, ...updatedUser };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedUser);
      jest.spyOn(repository, 'update').mockResolvedValue({
        affected: 1,
        generatedMaps: [updatedUser],
        raw: null,
      });

      const result = await service.update(1, updatedUser);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.update).toHaveBeenCalledWith(1, updatedUser);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('remove', () => {
    it('should delete a recipe', async () => {
      const mockUser = {
        id: 1,
        username: 'User 1',
        email: 'test@test.cq',
        password: '123456',
        enabled: true,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);

      const mockDeleteResult = { affected: 1, raw: null };
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);

      const result = await service.remove(1);
      expect(result).toEqual(true);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false if recipe is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.remove(1);
      expect(result).toEqual(false);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
