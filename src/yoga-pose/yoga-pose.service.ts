import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YogaPose } from './entities/yoga-pose.entity';

@Injectable()
export class YogaPoseService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
  ) {
    this.logger = new Logger('yoga pose service');
  }
}
