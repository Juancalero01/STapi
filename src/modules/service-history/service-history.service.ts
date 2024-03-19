import { Injectable } from '@nestjs/common';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service-history.dto';
import { ServiceHistoryEntity } from './service-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { ServiceEntity } from '../service/service.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ServiceHistoryService {
  constructor(
    @InjectRepository(ServiceHistoryEntity)
    private readonly serviceHistoryRepository: Repository<ServiceHistoryEntity>,
  ) {}

  async findAll(): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findLastHistory(id: number): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryRepository.findOne({
        where: {
          service: {
            id: id,
          },
        },
        order: { id: 'DESC' },
        relations: ['stateCurrent', 'stateNext'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findService(id: number): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryRepository.find({
        where: {
          service: { id },
        },
        relations: ['service', 'user', 'stateCurrent', 'stateNext'],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateServiceHistoryDto): Promise<void> {
    try {
      await this.serviceHistoryRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceHistoryDto): Promise<void> {
    try {
      await this.serviceHistoryRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async findLastDateEntry(id: number): Promise<ServiceHistoryEntity> {
    try {
      const serviceHistoryFound = await this.serviceHistoryRepository
        .createQueryBuilder('service_history')
        .where('service_history.serviceId = :id', { id })
        .orderBy('service_history.id', 'DESC')
        .limit(1)
        .getOne();
      return serviceHistoryFound;
    } catch (error) {
      throw error;
    }
  }

  async findActivities(): Promise<ServiceHistoryEntity[]> {
    try {
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const activities = await this.serviceHistoryRepository.find({
        where: {
          dateEntry: Between(oneWeekAgo, currentDate),
        },
        order: {
          dateEntry: 'DESC',
        },
        relations: ['service', 'user', 'stateCurrent', 'stateNext'],
      });
      return activities;
    } catch (error) {
      throw error;
    }
  }

  //!Testear
  async createHistories(
    body: {
      dateEntry: Date;
      stateCurrent: ServiceStateEntity;
      stateNext: ServiceStateEntity;
      remarks: string;
      service: ServiceEntity;
      user: UserEntity;
    }[],
  ): Promise<void> {
    try {
      await this.serviceHistoryRepository.save(body);
    } catch (error) {
      throw error;
    }
  }
}
