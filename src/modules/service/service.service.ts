import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { Between, In, Not, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';

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

  async updateDateDeparture(id: number, dateDeparture: Date): Promise<void> {
    try {
      await this.serviceRepository.update(id, {
        dateDeparture: new Date().toISOString().slice(0, 19).replace('T', ' '),
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

        const result = this.getRepairServices(services).map((service) => {
          const serviceHistory = service.serviceHistory;
          const totalHoursByState = {};

          // Utilizar reduce para sumar los milisegundos
          serviceHistory.reduce((prevHistory, currentHistory) => {
            const currentTimestamp = currentHistory.dateEntry.getTime();
            const prevTimestamp = prevHistory.dateEntry.getTime();
            const timeDifference = currentTimestamp - prevTimestamp;

            !totalHoursByState[currentHistory.stateCurrent.id]
              ? (totalHoursByState[currentHistory.stateCurrent.id] =
                  timeDifference)
              : (totalHoursByState[currentHistory.stateCurrent.id] +=
                  timeDifference);

            return currentHistory;
          }, serviceHistory[0]);

          const totalHoursRepair =
            (totalHoursByState[6] || 0) - (totalHoursByState[8] || 0);

          const formatTime = (timeMillis) => {
            const days = Math.floor(timeMillis / (24 * 60 * 60 * 1000));
            const hours = Math.floor(
              (timeMillis % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
            );
            const minutes = Math.floor(
              (timeMillis % (60 * 60 * 1000)) / (60 * 1000),
            );

            if (days > 0) {
              return `${days} día(s) ${hours} hora(s)`;
            } else if (hours > 0) {
              return `${hours} hora(s) ${minutes} minuto(s)`;
            } else {
              return `${minutes} minuto(s)`;
            }
          };

          // Imprimir el resultado
          console.log(formatTime(totalHoursRepair));
          //!TODO FIJAR ESTE DE ABAJO QUE FUNCIONA MAS O MENOS PERO FUNCIONA
          //!TODO  HAY QUE HACER PEQUEÑAS FUNCIONALIDADES QUE CADA UNA HAGA COSAS
          //!TODO POR ULTIMO MODIFICAR LOS RESULTADOS QUE TRAEN EN LA api.

          // let totalHoursRepair = 0;
          // serviceHistory.forEach((history) => {
          //   const timestamp = history.dateEntry.getTime();
          //   console.log(timestamp);
          //   !totalHoursByState[history.stateCurrent.id]
          //     ? (totalHoursByState[history.stateCurrent.id] = timestamp)
          //     : (totalHoursByState[history.stateCurrent.id] += timestamp);
          //   // const hour = history.dateEntry.getHours();
          //   // const minutes = history.dateEntry.getMinutes();
          //   // const timeInMinutes = hour * 60 + minutes;
          //   // !totalHoursByState[history.stateCurrent.id]
          //   //   ? (totalHoursByState[history.stateCurrent.id] = timeInMinutes)
          //   //   : (totalHoursByState[history.stateCurrent.id] += timeInMinutes);
          //   // totalHoursRepair = totalHoursByState[6] - totalHoursByState[8] || 0;
          // });
          // totalHoursRepair =
          //   (totalHoursByState[6] || 0) - (totalHoursByState[8] || 0);
          // const formatTime = (totalMinutes) => {
          //   const hours = Math.floor(totalMinutes / 60);
          //   const minutes = totalMinutes % 60;
          //   return `${hours}:${minutes}`;
          // };

          // const formatTime2 = (totalMinutes) => {
          //   const days = Math.floor(totalMinutes / (60 * 24));
          //   const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
          //   const minutes = totalMinutes % 60;

          //   if (days > 0) {
          //     return `${days} día(s) ${hours} hora(s)`;
          //   } else if (hours > 0) {
          //     return `${hours} hora(s) ${minutes} minuto(s)`;
          //   } else {
          //     return `${minutes} minuto(s)`;
          //   }
          // };

          return {
            serviceReclaim: service.reclaim,
            serviceProduct: service.product.serial,
            inRepair: formatTime(totalHoursByState[6] || 0),
            repair: formatTime(totalHoursByState[8] || 0),
            totalHoursRepair: formatTime(totalHoursRepair),
          };
        });

        return {
          numberOfServices: this.getnumberOfServices(services),
          reentryServices: this.getReentryServices(services),
          repairServices: this.getRepairServices(services).length,
          hoursServices: result,
        };
      }
    } catch (error) {}
  }

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

  //todo: fns to indicators
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
