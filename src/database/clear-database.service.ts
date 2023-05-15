// clear-db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YogaPose } from '../yoga-pose/entities/yoga-pose.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClearDbService {
  constructor(
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
  ) {}

  async clearAllData(): Promise<void> {
    await this.yogaPoseRepository.query('TRUNCATE TABLE "yoga_pose" CASCADE;');

    await this.yogaPoseRepository.delete({});
    // Add more repository clear statements for other entities as needed
  }
}
