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

  async findById(id: number): Promise<YogaPose> {
    return this.yogaPoseRepository.findOneBy({ poseId: id });
  }

  async create(yogaPoseInput: CreateYogaPoseInput): Promise<YogaPose> {
    const yogaPose = this.yogaPoseRepository.create(yogaPoseInput);
    return this.yogaPoseRepository.save(yogaPose);
  }

  async update(
    id: number,
    yogaPoseData: UpdateYogaPoseInput,
  ): Promise<YogaPose> {
    await this.yogaPoseRepository.update(id, yogaPoseData);
    return this.yogaPoseRepository.findOneBy({ poseId: id });
  }

  async delete(id: number): Promise<void> {
    await this.yogaPoseRepository.delete(id);
  }
}
