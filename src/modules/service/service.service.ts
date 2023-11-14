import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FailureTypeService } from '../failure-type/failure-type.service';
import { ServiceStateEntity } from '../service-state/service-state.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,

    private readonly failureTypeService: FailureTypeService,
  ) {}

  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        relations: ['product', 'state', 'priority', 'failureTypes'],
        where: { state: Not(In([8, 9])) },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServiceEntity> {
    try {
      return await this.serviceRepository.findOne({
        where: { id },
        relations: ['product', 'state', 'priority', 'failureTypes'],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateServiceDto): Promise<void> {
    try {
      await this.serviceRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceDto): Promise<void> {
    try {
      const serviceFound = await this.findOne(id);
      if (!serviceFound) {
        throw new HttpException('Service not found', 404);
      }
      if (body.failureTypes === null) {
        body.failureTypes = [];
      }
      await this.serviceRepository
        .createQueryBuilder('service')
        .relation('failureTypes')
        .of(serviceFound.id)
        .addAndRemove(body.failureTypes, serviceFound.failureTypes);
      await this.serviceRepository.update(id, {
        reference: body.reference,
        securityStrap: body.securityStrap,
        failure: body.failure,
        remarks: body.remarks,
        warranty: body.warranty,
        priority: body.priority,
      });
    } catch (error) {
      throw error;
    }
  }

  async findLastReclaim(): Promise<string | null> {
    try {
      const serviceFound = await this.serviceRepository
        .createQueryBuilder('service')
        .orderBy('service.id', 'DESC')
        .limit(1)
        .getOne();

      if (serviceFound) {
        return JSON.stringify(serviceFound.reclaim);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  //TODO: Create method for update service state.
  async updateState(id: number, state: ServiceStateEntity): Promise<void> {
    try {
      await this.serviceRepository.update(id, {
        state: state,
      });
    } catch (error) {
      throw error;
    }
  }
}
