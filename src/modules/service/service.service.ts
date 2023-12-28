import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { Between, In, Not, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceStateEntity } from '../service-state/service-state.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        relations: ['product', 'state', 'priority', 'failureTypes'],
        order: {
          dateEntry: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllActiveServices(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        where: { state: Not(In([11, 12])) },
        relations: ['product', 'state', 'priority', 'failureTypes'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllWithOutCancel(): Promise<number> {
    try {
      const services = await this.serviceRepository.find({
        where: { state: Not(12) },
        relations: ['product', 'state', 'priority', 'failureTypes'],
      });
      return services.length;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithRepair(): Promise<number> {
    try {
      const repairStateId = 8;

      const services = await this.serviceRepository
        .createQueryBuilder('service')
        .innerJoinAndSelect(
          'service_histories',
          'history',
          'service.id = history.serviceId',
        )
        .where('history.stateCurrentId = :repairStateId', { repairStateId })
        .getMany();
      return services.length;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithOutRepair(): Promise<number> {
    try {
      const withOutRepairStateId = 7;

      const services = await this.serviceRepository
        .createQueryBuilder('service')
        .innerJoinAndSelect(
          'service_histories',
          'history',
          'service.id = history.serviceId',
        )
        .where('history.stateCurrentId = :withOutRepairStateId', {
          withOutRepairStateId,
        })
        .getMany();
      return services.length;
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
        startReference: body.startReference,
        endReference: body.endReference,
        securityStrap: body.securityStrap,
        failure: body.failure,
        remarks: body.remarks,
        warranty: body.warranty,
        orderNumber: body.orderNumber,
        quoteNumber: body.quoteNumber,
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

  async updateState(id: number, state: ServiceStateEntity): Promise<void> {
    try {
      await this.serviceRepository.update(id, {
        state,
      });
    } catch (error) {
      throw error;
    }
  }

  async setDateDeparture(id: number, dateDeparture: Date): Promise<void> {
    try {
      await this.serviceRepository.update(id, {
        dateDeparture: new Date(dateDeparture)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
      });
    } catch (error) {
      throw error;
    }
  }

  async setRepairedTime(id: number, repairedTime: number): Promise<void> {
    try {
      await this.serviceRepository.update(id, {
        repairedTime: repairedTime,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByProduct(id: number): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        where: {
          product: {
            id,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getServiceIndicators(body: any): Promise<any> {
    try {
      if (body.productTypeId === null) {
        const services: ServiceEntity[] = await this.performAdditionalFiltering(
          body.dateFrom,
          body.dateUntil,
        );

        return {
          numberOfServices: this.getnumberOfServices(services),
          reentryServices: this.getReentryServices(services),
          repairServices: this.getRepairServices(services).length,
          // hora de servicio dentro de los servicios reparados
        };
      }
    } catch (error) {}
  }

  // filter
  // Modificated: optional params* productID
  async performAdditionalFiltering(
    dateFrom: Date,
    dateUntil: Date,
  ): Promise<any> {
    try {
      return await this.serviceRepository.find({
        where: {
          dateEntry: Between(new Date(dateFrom), new Date(dateUntil)),
          state: Not(12),
        },
        relations: ['serviceHistory', 'failureTypes'],
      });
    } catch (error) {
      throw error;
    }
  }

  // SERVICES INDICATORS optionals
  private getnumberOfServices(services: ServiceEntity[]) {
    return services.length;
  }

  private getReentryServices(services: ServiceEntity[]) {
    return services.filter(
      (service, index, array) =>
        array.findIndex((s) => s.product.id === service.product.id) !== index,
    ).length;
  }

  private getRepairServices(services: ServiceEntity[]) {
    return services.filter((service) =>
      service.serviceHistory.some(
        (history) =>
          history.stateCurrent.id === 6 || history.stateCurrent.id === 8,
      ),
    );
  }
}
