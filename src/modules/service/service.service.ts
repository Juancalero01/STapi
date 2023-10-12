import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async findAll() {
    try {
      return await this.serviceRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.serviceRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateServiceDto) {
    try {
      const service = this.serviceRepository.save(body);
      return service;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceDto) {
    try {
      const service = await this.findOne(id);
      if (service) await this.serviceRepository.update(id, body);
      return service;
    } catch (error) {
      throw error;
    }
  }

  async lastReclaimNumber(): Promise<string> {
    try {
      const service = await this.serviceRepository.findOne({
        order: { reclaim: 'DESC' },
      });
      return service.reclaim;
    } catch (error) {
      throw error;
    }
  }
}
