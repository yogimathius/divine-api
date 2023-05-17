// clear-db.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ClearUserDbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async clearAllData(): Promise<void> {
    await this.userRepository.query('TRUNCATE TABLE "user" CASCADE;');

    await this.userRepository.delete({});
    // Add more repository clear statements for other entities as needed
  }
}
