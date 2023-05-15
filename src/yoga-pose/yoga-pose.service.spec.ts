import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { YogaPose } from './entities/yoga-pose.entity';
import { YogaPoseService } from './yoga-pose.service';
import { UpdateYogaPoseInput } from './dtos/update-yoga-pose.input';
import { CreateYogaPoseInput } from './dtos/create-yoga-pose.input';

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
          poseId: 1,
          poseName: 'Pose 1',
          poseDescription: 'Description 1',
          posePoints: 10,
          poseImagePath: '',
        },
        {
          poseId: 2,
          poseName: 'Pose 2',
          poseDescription: 'Description 2',
          posePoints: 15,
          poseImagePath: '',
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
        poseId: 1,
        poseName: 'Pose 1',
        poseDescription: 'Description 1',
        posePoints: 10,
        poseImagePath: '',
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
      const newPoseData: CreateYogaPoseInput = {
        poseName: 'New Pose',
        poseDescription: 'New Description',
        posePoints: 20,
        poseImagePath: '',
      };
      const createdPose: YogaPose = {
        poseId: 3,
        poseName: 'New Pose',
        poseDescription: 'New Description',
        posePoints: 20,
        poseImagePath: '',
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
      const updatedPoseData: UpdateYogaPoseInput = {
        poseId: id,
        poseName: 'Updated Pose',
        poseDescription: 'Updated Description',
      };
      const updatedPose: YogaPose = {
        poseId: 1,
        poseName: 'Updated Pose',
        poseDescription: 'Updated Description',
        posePoints: 10,
        poseImagePath: '',
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
        poseId: 1,
        poseName: 'Deleted Pose',
        poseDescription: 'Deleted Description',
        posePoints: 10,
        poseImagePath: '',
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
