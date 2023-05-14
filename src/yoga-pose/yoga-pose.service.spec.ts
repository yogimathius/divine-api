import { Test, TestingModule } from '@nestjs/testing';
import { YogaPoseService } from './yoga-pose.service';
import { YogaPose } from './entities/yoga-pose.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('YogaPoseService', () => {
  let service: YogaPoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(YogaPose),
          useValue: mockRepository(),
        },
        YogaPoseService,
      ],
    }).compile();

    service = module.get<YogaPoseService>(YogaPoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
