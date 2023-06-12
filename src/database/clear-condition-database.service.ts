// clear-db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condition } from '../condition/entities/condition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClearAchievementDbService {
  constructor(
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {}

  async clearAllData(): Promise<void> {
    await this.conditionRepository.query('TRUNCATE TABLE "condition" CASCADE;');

    await this.conditionRepository.delete({});
    // Add more repository clear statements for other entities as needed
  }
}
