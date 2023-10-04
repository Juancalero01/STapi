import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicePriorityEntity } from './service-priority.entity';

@Injectable()
export class ServicePriorityService {
  constructor(
    @InjectRepository(ServicePriorityEntity)
    private readonly serviceStateRepository: Repository<ServicePriorityEntity>,
  ) {}

  async findAll(): Promise<ServicePriorityEntity[]> {
    try {
      return await this.serviceStateRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServicePriorityEntity> {
    try {
      return await this.serviceStateRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
