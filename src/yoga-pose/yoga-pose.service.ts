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

  async findAll(): Promise<YogaPose[]> {
    return this.yogaPoseRepository.find();
  }

  async findById(id: number): Promise<YogaPose> {
    return this.yogaPoseRepository.findOneBy({ pose_id: id });
  }

  async create(yogaPoseData: Partial<YogaPose>): Promise<YogaPose> {
    const yogaPose = this.yogaPoseRepository.create(yogaPoseData);
    return this.yogaPoseRepository.save(yogaPose);
  }

  async update(id: number, yogaPoseData: Partial<YogaPose>): Promise<YogaPose> {
    await this.yogaPoseRepository.update(id, yogaPoseData);
    return this.yogaPoseRepository.findOneBy({ pose_id: id });
  }

  async delete(id: number): Promise<void> {
    await this.yogaPoseRepository.delete(id);
  }
}
