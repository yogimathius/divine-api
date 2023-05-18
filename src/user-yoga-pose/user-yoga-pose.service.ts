import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';
import { UserService } from '../user/user.service';
import { YogaPoseService } from '../yoga-pose/yoga-pose.service';
import { CreateUserYogaPoseInput } from './dto/create-user-yoga-pose.input';

@Injectable()
export class UserYogaPoseService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserYogaPose)
    private readonly userYogaPoseRepository: Repository<UserYogaPose>,
    private readonly userService: UserService,
    private readonly yogaPoseService: YogaPoseService,
  ) {
    this.logger = new Logger('user yoga pose service');
  }

  async createUserYogaPose(
    userYogaPoseInput: CreateUserYogaPoseInput,
  ): Promise<UserYogaPose> {
    const userYogaPose = new UserYogaPose();
    this.logger.verbose('new user yoga pose: ', { userYogaPose });

    const { userId, poseId, completionDate } = userYogaPoseInput;
    this.logger.verbose('searching for user with id: ', { userId });

    const user = await this.userService.findBy('id', userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    this.logger.verbose('found user: ', { user });

    userYogaPose.user = user;
    this.logger.verbose('searching for pose with id: ', poseId);

    const pose = await this.yogaPoseService.findById(poseId);

    if (!pose) {
      throw new Error(`Yoga Pose with ID ${poseId} not found.`);
    }
    this.logger.verbose('found pose: ', { pose });

    userYogaPose.pose = pose;

    userYogaPose.completion_date = completionDate;
    this.logger.debug(this.userYogaPoseRepository.save(userYogaPose));
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
