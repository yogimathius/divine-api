import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YogaPose } from '../entities/yoga-pose.entity';
import { yogaPosesSeed } from './yoga-pose.seed';

@Injectable()
export class YogaPoseSeedService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
  ) {
    this.logger = new Logger('yoga pose seed service');
  }

  async seed(): Promise<void> {
    for (const pose in yogaPosesSeed) {
      this.logger.verbose('adding new pose to db: ', pose);
      const yogaPose = this.yogaPoseRepository.create(yogaPosesSeed[pose]);
      this.logger.verbose('new pose created: ', { yogaPose });

      await this.yogaPoseRepository.save(yogaPose);
    }
  }
}
