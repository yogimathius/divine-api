// clear-db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserYogaPose } from 'src/user-yoga-pose/entities/user-yoga-pose.entity';

@Injectable()
export class ClearUserYogaDbService {
  constructor(
    @InjectRepository(UserYogaPose)
    private readonly userYogaPoseRepository: Repository<UserYogaPose>,
  ) {}

  async clearAllData(): Promise<void> {
    await this.userYogaPoseRepository.query(
      'TRUNCATE TABLE "user_yoga_pose" CASCADE;',
    );

    await this.userYogaPoseRepository.delete({});
    // Add more repository clear statements for other entities as needed
  }
}
