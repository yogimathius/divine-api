import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YogaPose } from '../entities/yoga-pose.entity';
import { yogaPosesSeed } from './yoga-pose.seed';

@Injectable()
export class YogaPoseSeedService {
  constructor(
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
  ) {}

  async seed(): Promise<void> {
    for (const pose of yogaPosesSeed) {
      const yogaPose = this.yogaPoseRepository.create(pose);
      await this.yogaPoseRepository.save(yogaPose);
    }
  }
}
