// clear-db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from 'src/achievement/entities/achievement.entity';

@Injectable()
export class ClearAchievementDbService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async clearAllData(): Promise<void> {
    await this.achievementRepository.query(
      'TRUNCATE TABLE "user_yoga_pose" CASCADE;',
    );

    await this.achievementRepository.delete({});
    // Add more repository clear statements for other entities as needed
  }
}
