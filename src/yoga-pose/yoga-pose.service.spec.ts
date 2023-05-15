import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseService } from './yoga-pose.service';

describe('YogaPoseService', () => {
  let yogaPoseService: YogaPoseService;
  let yogaPoseRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YogaPoseService,
        {
          provide: getRepositoryToken(YogaPose),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    yogaPoseService = module.get<YogaPoseService>(YogaPoseService);
    yogaPoseRepositoryMock = module.get(getRepositoryToken(YogaPose));
  });

  describe('findAll', () => {
    it('should return an array of yoga poses', async () => {
      const yogaPoses: YogaPose[] = [
        {
          pose_id: 1,
          pose_name: 'Pose 1',
          pose_description: 'Description 1',
          pose_points: 10,
          pose_image_path: '',
        },
        {
          pose_id: 2,
          pose_name: 'Pose 2',
          pose_description: 'Description 2',
          pose_points: 15,
          pose_image_path: '',
        },
      ];
      yogaPoseRepositoryMock.find.mockResolvedValue(yogaPoses);

      const result = await yogaPoseService.findAll();

      expect(result).toEqual(yogaPoses);
      expect(yogaPoseRepositoryMock.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a yoga pose by ID', async () => {
      const yogaPose: YogaPose = {
        pose_id: 1,
        pose_name: 'Pose 1',
        pose_description: 'Description 1',
        pose_points: 10,
        pose_image_path: '',
      };
      const id = 1;
      yogaPoseRepositoryMock.findOne.mockResolvedValue(yogaPose);

      const result = await yogaPoseService.findById(id);

      expect(result).toEqual(yogaPose);
      expect(yogaPoseRepositoryMock.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a new yoga pose', async () => {
      const newPoseData: Partial<YogaPose> = {
        pose_name: 'New Pose',
        pose_description: 'New Description',
        pose_points: 20,
      };
      const createdPose: YogaPose = {
        pose_id: 3,
        pose_name: 'New Pose',
        pose_description: 'New Description',
        pose_points: 20,
        pose_image_path: '',
      };
      yogaPoseRepositoryMock.create.mockReturnValue(newPoseData);
      yogaPoseRepositoryMock.save.mockResolvedValue(createdPose);

      const result = await yogaPoseService.create(newPoseData);

      expect(result).toEqual(createdPose);
      expect(yogaPoseRepositoryMock.create).toHaveBeenCalledWith(newPoseData);
      expect(yogaPoseRepositoryMock.save).toHaveBeenCalledWith(newPoseData);
    });
  });

  describe('update', () => {
    it('should update an existing yoga pose', async () => {
      const id = 1;
      const updatedPoseData: Partial<YogaPose> = {
        pose_name: 'Updated Pose',
        pose_description: 'Updated Description',
      };
      const updatedPose: YogaPose = {
        pose_id: 1,
        pose_name: 'Updated Pose',
        pose_description: 'Updated Description',
        pose_points: 10,
        pose_image_path: '',
      };
      yogaPoseRepositoryMock.findOne.mockResolvedValue(updatedPose);
      yogaPoseRepositoryMock.update.mockResolvedValue({ affected: 1 });

      const result = await yogaPoseService.update(id, updatedPoseData);

      expect(result).toEqual(updatedPose);
      expect(yogaPoseRepositoryMock.findOne).toHaveBeenCalledWith(id);
      expect(yogaPoseRepositoryMock.update).toHaveBeenCalledWith(
        id,
        updatedPoseData,
      );
    });
  });

  describe('delete', () => {
    it('should remove an existing yoga pose', async () => {
      const id = 1;
      const deletedPose: YogaPose = {
        pose_id: 1,
        pose_name: 'Deleted Pose',
        pose_description: 'Deleted Description',
        pose_points: 10,
        pose_image_path: '',
      };
      yogaPoseRepositoryMock.findOne.mockResolvedValue(deletedPose);
      yogaPoseRepositoryMock.delete.mockResolvedValue({ affected: 1 });

      const result = await yogaPoseService.delete(id);

      expect(result).toEqual(deletedPose);
      expect(yogaPoseRepositoryMock.findOne).toHaveBeenCalledWith(id);
      expect(yogaPoseRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
