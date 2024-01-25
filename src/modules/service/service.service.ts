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
        relations: [
          'product',
          'state',
          'priority',
          'failureTypes',
          'serviceHistory',
        ],
        where: { state: Not(13) },
        order: {
          dateEntry: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getServiceMain(): Promise<any> {
    try {
      const currentYear = new Date().getFullYear();

      return {
        services: await this.findAllWithOutCancel(currentYear),
        servicesActive: (await this.findAllActiveServices(currentYear)).length,
        servicesRepair: await this.findAllWithRepair(currentYear),
        servicesWithOutRepair: await this.findAllWithOutRepair(currentYear),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllActiveServices(year?: number): Promise<ServiceEntity[]> {
    try {
      const whereConditions: any = { state: Not(In([12, 13])) };

      if (year !== undefined) {
        whereConditions.dateEntry = Between(
          new Date(`${year}-01-01`),
          new Date(`${year + 1}-01-01`),
        );
      }

      const services = await this.serviceRepository.find({
        where: whereConditions,
        relations: [
          'product',
          'state',
          'priority',
          'failureTypes',
          'serviceHistory',
          'serviceHistory.serviceNote',
          'serviceHistory.serviceNote.state',
          'serviceHistory.serviceNote.user',
          'serviceHistory.serviceNote.serviceHistory',
        ],
        order: {
          priority: {
            id: 'ASC',
          },
          dateEntry: 'DESC',
        },
      });

      return services;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithOutCancel(year: number): Promise<number> {
    try {
      const services = await this.serviceRepository.find({
        where: {
          state: Not(13),
          dateEntry: Between(
            new Date(`${year}-01-01`),
            new Date(`${year + 1}-01-01`),
          ),
        },
        relations: ['product', 'state', 'priority', 'failureTypes'],
      });
      return services.length;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithRepair(year: number): Promise<number> {
    try {
      const services = await this.serviceRepository.find({
        relations: ['serviceHistory'],
        where: {
          serviceHistory: {
            stateCurrent: {
              id: 9,
            },
            stateNext: {
              id: 10,
            },
          },
          dateEntry: Between(
            new Date(`${year}-01-01`),
            new Date(`${year + 1}-01-01`),
          ),
        },
      });
      return services.length;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithOutRepair(year: number): Promise<number> {
    try {
      const services = await this.serviceRepository.find({
        relations: ['serviceHistory'],
        where: {
          serviceHistory: {
            stateCurrent: {
              id: 7,
            },
          },
          dateEntry: Between(
            new Date(`${year}-01-01`),
            new Date(`${year + 1}-01-01`),
          ),
        },
      });
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
        bitrixUrl: body.bitrixUrl,
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
      const services = await this.filterServices(body);

      if (services && services.length > 0) {
        return {
          numberOfServices: this.getnumberOfServices(services),
          reentryServices: this.getReentryServices(services),
          numberOfServicesRepair: this.getServicesRepair(services),
          numberOfServicesNotRepair: this.getServicesNotRepair(services),
          repairTime: this.getRepairedTime(services),
          repairTimeOfStay: this.getStayInformation(services),
          failureServices: this.getFailureTypes(services),
          productTypeServices: this.getProductTypes(services),
          warranty: this.getWarrantyPercentage(services),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  private async filterServices(body: any): Promise<ServiceEntity[]> {
    if (body.productTypeId === null && body.clientId === null) {
      return this.allfilterServices(body.dateFrom, body.dateUntil);
    } else if (body.productTypeId !== null && body.clientId === null) {
      return this.allfilterServicesWithProductType(
        body.dateFrom,
        body.dateUntil,
        body.productTypeId,
      );
    } else if (body.productTypeId === null && body.clientId !== null) {
      return this.allfilterServicesWithClient(
        body.dateFrom,
        body.dateUntil,
        body.clientId,
      );
    } else {
      return this.allfilterServicesWithProductTypeAndClient(
        body.dateFrom,
        body.dateUntil,
        body.productTypeId,
        body.clientId,
      );
    }
  }

  async allfilterServices(dateFrom: Date, dateUntil: Date): Promise<any> {
    try {
      return await this.serviceRepository.find({
        where: {
          dateEntry: Between(new Date(dateFrom), new Date(dateUntil)),
          state: Not(13),
        },
        relations: ['serviceHistory', 'failureTypes'],
      });
    } catch (error) {
      throw error;
    }
  }

  async allfilterServicesWithProductType(
    dateFrom: Date,
    dateUntil: Date,
    productTypeId: number,
  ): Promise<any> {
    try {
      return await this.serviceRepository.find({
        where: {
          dateEntry: Between(new Date(dateFrom), new Date(dateUntil)),
          state: Not(13),
          product: {
            productType: {
              id: productTypeId,
            },
          },
        },
        relations: ['serviceHistory', 'failureTypes', 'product'],
      });
    } catch (error) {
      throw error;
    }
  }

  async allfilterServicesWithClient(
    dateFrom: Date,
    dateUntil: Date,
    clientId: number,
  ): Promise<any> {
    try {
      return await this.serviceRepository.find({
        where: {
          dateEntry: Between(new Date(dateFrom), new Date(dateUntil)),
          state: Not(13),
          product: {
            client: {
              id: clientId,
            },
          },
        },
        relations: ['serviceHistory', 'failureTypes', 'product'],
      });
    } catch (error) {
      throw error;
    }
  }

  async allfilterServicesWithProductTypeAndClient(
    dateFrom: Date,
    dateUntil: Date,
    productTypeId: number,
    clientId: number,
  ): Promise<any> {
    try {
      return await this.serviceRepository.find({
        where: {
          dateEntry: Between(new Date(dateFrom), new Date(dateUntil)),
          state: Not(13),
          product: {
            client: {
              id: clientId,
            },
            productType: {
              id: productTypeId,
            },
          },
        },
        relations: ['serviceHistory', 'failureTypes', 'product'],
      });
    } catch (error) {
      throw error;
    }
  }

  private getnumberOfServices(services: ServiceEntity[]): ServiceEntity[] {
    return services;
  }

  private getReentryServices(services: ServiceEntity[]): ServiceEntity[] {
    return services.filter(
      (service, index, array) =>
        array.findIndex((s) => s.product.id === service.product.id) !== index,
    );
  }
  private getServicesRepair(services: ServiceEntity[]): ServiceEntity[] {
    return services.filter((service) => {
      const repairHistoryEntry = service.serviceHistory.find((sh) => {
        return sh.stateCurrent.id === 9 && sh.stateNext.id === 10;
      });

      return repairHistoryEntry !== undefined;
    });
  }
  private getServicesNotRepair(services: ServiceEntity[]): ServiceEntity[] {
    return services.filter((service) => {
      const repairHistoryEntry = service.serviceHistory.find((sh) => {
        return sh.stateCurrent.id === 7 && sh.stateNext.id === 10;
      });

      return repairHistoryEntry !== undefined;
    });
  }

  private getRepairedTime(services: ServiceEntity[]): {
    totalHours: number;
    averageHours: number;
  } {
    const totalServices = services.length;

    if (totalServices === 0) {
      return { totalHours: 0, averageHours: 0 };
    }

    const totalHours = services.reduce(
      (acc, service) => acc + (service.repairedTime || 0),
      0,
    );
    const averageHours = Math.round(totalHours / totalServices);

    return { totalHours, averageHours };
  }

  private getStayInformation(services: ServiceEntity[]): {
    totalDays: number;
    averageDays: number;
  } {
    const totalServices = services.length;

    if (totalServices === 0) {
      return {
        totalDays: 0,
        averageDays: 0,
      };
    }

    const totalDays = services.reduce((acc, service) => {
      const timeOfStay = this.calculateTimeOfStay(service);
      return timeOfStay != null ? acc + timeOfStay : acc;
    }, 0);

    const averageDays = Math.round(totalDays / totalServices);

    return { totalDays, averageDays };
  }

  private calculateTimeOfStay(service: ServiceEntity): number | null {
    const { dateEntry, dateDeparture } = service;

    if (dateDeparture === null) {
      return null;
    }

    const timeDifference =
      new Date(dateDeparture).getTime() - new Date(dateEntry).getTime();
    const daysOfStay = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysOfStay);
  }

  private getFailureTypes(
    services: ServiceEntity[],
  ): { failure: string; percentage: number }[] {
    const allFailures = services.flatMap(
      (service) => service.failureTypes || [],
    );

    const failureTypesMap = allFailures.reduce((map, failureType) => {
      map.set(failureType.name, (map.get(failureType.name) || 0) + 1);
      return map;
    }, new Map<string, number>());

    const totalFailures = allFailures.length;

    const failureTypes = Array.from(failureTypesMap.entries()).map(
      ([name, count]) => ({
        failure: name,
        percentage: Math.round((count / totalFailures) * 100),
      }),
    );

    return failureTypes;
  }

  private getProductTypes(
    services: ServiceEntity[],
  ): { productType: string; percentage: number }[] {
    const productTypesMap = services.reduce((map, service) => {
      const productTypeName = service.product.productType.name;
      map.set(productTypeName, (map.get(productTypeName) || 0) + 1);
      return map;
    }, new Map<string, number>());

    const totalProductTypes = services.length;

    const productTypes = Array.from(productTypesMap.entries()).map(
      ([name, count]) => ({
        productType: name,
        percentage: Math.round((count / totalProductTypes) * 100),
      }),
    );

    return productTypes;
  }

  private getWarrantyPercentage(services: ServiceEntity[]): {
    inWarranty: number;
    notInWarranty: number;
  } {
    const totalServices = services.length;

    const inWarrantyCount = services.filter((s) => s.warranty === true).length;
    const notInWarrantyCount = services.filter(
      (s) => s.warranty === false,
    ).length;

    const inWarrantyPercentage = Math.round(
      (inWarrantyCount / totalServices) * 100,
    );
    const notInWarrantyPercentage = Math.round(
      (notInWarrantyCount / totalServices) * 100,
    );
    return {
      inWarranty: inWarrantyPercentage,
      notInWarranty: notInWarrantyPercentage,
    };
  }

  async getServicesByProductSerial(serial: string): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        relations: [
          'product',
          'state',
          'priority',
          'failureTypes',
          'serviceHistory',
          'serviceHistory.serviceNote',
          'serviceHistory.serviceNote.state',
          'serviceHistory.serviceNote.user',
          'serviceHistory.serviceNote.serviceHistory',
        ],
        where: {
          product: {
            serial,
          },
          state: Not(13),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getServicesByReclaim(reclaim: string): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        relations: [
          'product',
          'state',
          'priority',
          'failureTypes',
          'serviceHistory',
          'serviceHistory.serviceNote',
          'serviceHistory.serviceNote.state',
          'serviceHistory.serviceNote.user',
          'serviceHistory.serviceNote.serviceHistory',
        ],
        where: {
          reclaim,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
