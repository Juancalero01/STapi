import { HttpException, Injectable } from '@nestjs/common';
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

  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServiceEntity> {
    try {
      return await this.serviceRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  // create fn for search service by reclaim

  async create(body: CreateServiceDto): Promise<void> {
    try {
      // Refactorizar este endpoint para que devuelva si el servicio ya existe y
      // que tambien verifique el estado del servicio.

      await this.serviceRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceDto): Promise<void> {
    try {
      // Refactorizar este endpoint para que devuelva si el servicio no se encuentra
      // y que tambien verifique el estado del servicio.
      if (!(await this.findOne(id)))
        throw new HttpException(`Service with id: ${id} not found`, 404);
      await this.serviceRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async lastReclaim(): Promise<string> {
    try {
      const lastService = await this.serviceRepository.findOne({
        order: { id: 'DESC' },
      });
      console.log('Test service log:', lastService);
      return lastService.reclaim;
    } catch (error) {
      throw error;
    }
  }
}
