import { Injectable } from '@nestjs/common';
import { ServiceStateEntity } from './service-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceStateService {
  constructor(
    @InjectRepository(ServiceStateEntity)
    private readonly serviceStateRepository: Repository<ServiceStateEntity>,
  ) {}

  async findAll() {
    try {
      return await this.serviceStateRepository.find({
        select: ['id', 'name', 'isActive'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.serviceStateRepository.findOne({
        where: { id },
        select: ['id', 'name', 'isActive'],
      });
    } catch (error) {
      throw error;
    }
  }
}
