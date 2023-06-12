import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YogaPose } from './entities/yoga-pose.entity';
import { CreateYogaPoseInput } from './dtos/create-yoga-pose.input';
import { UpdateYogaPoseInput } from './dtos/update-yoga-pose.input';

@Injectable()
export class YogaPoseService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(YogaPose)
    private readonly yogaPoseRepository: Repository<YogaPose>,
  ) {
    this.logger = new Logger('yoga pose service');
  }

  async findAll(): Promise<YogaPose[]> {
    return this.yogaPoseRepository.find();
  }

  async findById(id: string): Promise<YogaPose> {
    this.logger.verbose('typ of ID: ', id);
    return this.yogaPoseRepository.findOneBy({ id });
  }

  async findByName(poseName: string): Promise<YogaPose> {
    return this.yogaPoseRepository.findOneBy({ poseName: poseName });
  }

  async create(yogaPoseInput: CreateYogaPoseInput): Promise<YogaPose> {
    const yogaPose = this.yogaPoseRepository.create(yogaPoseInput);
    return this.yogaPoseRepository.save(yogaPose);
  }

  async update(
    id: string,
    yogaPoseData: UpdateYogaPoseInput,
  ): Promise<YogaPose> {
    await this.yogaPoseRepository.update(id, yogaPoseData);
    return this.yogaPoseRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.yogaPoseRepository.delete(id);
  }
}
