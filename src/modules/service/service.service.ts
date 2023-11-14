import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FailureTypeService } from '../failure-type/failure-type.service';

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

  // TODO: REFACTORIZAR
  async update(id: number, body: UpdateServiceDto): Promise<void> {
    try {
      console.log({
        test: 'test before update',
        id: id,
        body: body,
      });

      if (body.failureTypes && body.failureTypes.length > 0) {
        const failureTypes = await this.failureTypeService.findIds(
          body.failureTypes,
        );
        body.failureTypes = failureTypes;
      }

      console.log({
        test: 'test after update',
        id: id,
        body: body,
      });

      await this.serviceRepository.update(id, body);
    } catch (error) {}
  }

  // async update(id: number, body: UpdateServiceDto): Promise<void> {
  //   const updateEntity = body; // Objeto para almacenar propiedades de la entidad a actualizar

  //   try {
  //     const serviceFound = await this.serviceRepository.findOne({
  //       where: { id },
  //       relations: ['failureTypes'],
  //     });

  //     if (!serviceFound) {
  //       throw new HttpException(`Service with id: ${id} not found`, 404);
  //     }

  //     // Actualizar las relaciones muchos a muchos si se proporcionan en el body
  //     if (body.failureTypes && body.failureTypes.length > 0) {
  //       const failureTypeIds = await this.failureTypeService.findIds(
  //         body.failureTypes,
  //       );

  //       // Actualizar las relaciones muchos a muchos
  //       serviceFound.failureTypes = failureTypeIds;

  //       // Utilizar save para actualizar las relaciones
  //       await this.serviceRepository.save(serviceFound);
  //     }

  //     // Utilizar update para actualizar las propiedades de la entidad
  //     await this.serviceRepository.update(id, updateEntity);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async update(id: number, body: UpdateServiceDto): Promise<void> {
  //   try {
  //     const serviceFound = await this.findOne(id);
  //     if (!serviceFound)
  //       throw new HttpException(`Service with id: ${id} not found`, 404);

  //     const failureTypes = await this.failureTypeService.findIds(
  //       body.failureTypes,
  //     );
  //     body.failureTypes = failureTypes;
  //     await this.serviceRepository.update(id, body);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const failureTypes = await this.failureTypeService.findIds(
  //   body.failureTypes,
  // );
  // serviceFound.failureTypes = body.failureTypes;
  // console.log(serviceFound);
  // if (!(await this.findOne(id)))
  //   throw new HttpException(`Service with id: ${id} not found`, 404);
  // await this.serviceRepository.update(id, body);

  // async update(id: number, body: UpdateServiceDto): Promise<void> {
  //   try {
  //     const serviceFound = await this.serviceRepository.findOne({
  //       where: { id },
  //       relations: ['failureTypes'],
  //     });

  //     if (!serviceFound) {
  //       throw new HttpException(`Service with id: ${id} not found`, 404);
  //     }

  //     const failureTypeIds = await this.failureTypeService.findIds(
  //       body.failureTypes,
  //     );

  //     // Actualizar las relaciones muchos a muchos
  //     serviceFound.failureTypes = failureTypeIds;

  //     // Ahora puedes actualizar y guardar la entidad
  //     await this.serviceRepository.save(serviceFound);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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
}
