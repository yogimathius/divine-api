import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserService } from '../user/user.service';
import { YogaPoseService } from '../yoga-pose/yoga-pose.service';
import { CreateUserYogaPoseInput } from './dto/create-user-yoga-pose.input';

@Injectable()
export class UserYogaPoseService {
  constructor(
    @InjectRepository(UserYogaPose)
    private readonly userYogaPoseRepository: Repository<UserYogaPose>,
    private readonly userService: UserService,
    private readonly yogaPoseService: YogaPoseService,
  ) {}

  async createUserYogaPose(
    userYogaPoseInput: CreateUserYogaPoseInput,
  ): Promise<UserYogaPose> {
    const userYogaPose = new UserYogaPose();
    const { userId, poseId, completionDate } = userYogaPoseInput;
    const user = await this.userService.findBy('id', userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    userYogaPose.user = user;

    const pose = await this.yogaPoseService.findById(poseId);
    if (!pose) {
      throw new Error(`Yoga Pose with ID ${poseId} not found.`);
    }
    userYogaPose.pose = pose;

    userYogaPose.completion_date = completionDate;

    return this.userYogaPoseRepository.save(userYogaPose);
  }

  async findAllUserYogaPoses(): Promise<UserYogaPose[]> {
    return this.userYogaPoseRepository.find();
  }

  // async findUserYogaPoseById(id: number): Promise<UserYogaPose> {
  //   return this.userYogaPoseRepository.findOne(id);
  // }

  async deleteUserYogaPose(id: number): Promise<void> {
    await this.userYogaPoseRepository.delete(id);
  }
}
