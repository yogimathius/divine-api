import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserYogaPose } from './entities/user-yoga-pose.entity';

@Injectable()
export class UserYogaPoseService {
  constructor(
    @InjectRepository(UserYogaPose)
    private readonly userYogaPoseRepository: Repository<UserYogaPose>,
  ) {}

  // Implement your service methods here
}
