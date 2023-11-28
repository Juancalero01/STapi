import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicePriorityEntity } from './service-priority.entity';
import { UpdateServicePriorityDto } from './dto/update-service-priority.dto';
import { CreateServicePriorityDto } from './dto/create-service-priority.dto';

@Injectable()
export class ServicePriorityService {
  constructor(
    @InjectRepository(ServicePriorityEntity)
    private readonly serviceStateRepository: Repository<ServicePriorityEntity>,
  ) {}

  async findAll(): Promise<ServicePriorityEntity[]> {
    try {
      return await this.serviceStateRepository.find({});
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServicePriorityEntity> {
    try {
      return await this.serviceStateRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneName(name: string): Promise<ServicePriorityEntity> {
    try {
      return await this.serviceStateRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateServicePriorityDto): Promise<void> {
    try {
      if (await this.findOneName(body.name))
        throw new HttpException(
          `Service Priority with name ${body.name} already exists`,
          409,
        );
      await this.serviceStateRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServicePriorityDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(
          `Service Priority with id ${id} not found`,
          404,
        );
      const servicePriorityFound = await this.findOneName(body.name);
      if (servicePriorityFound && servicePriorityFound.id !== id)
        throw new HttpException(
          `Service Priority with name ${body.name} already exists`,
          409,
        );
      await this.serviceStateRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
