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

  private readonly querySelect: string[] = [
    // buscar tambien el name del product segun ese id hay que buscar en el tipo de product
    'service.id',
    'service.dateEntry',
    'service.createdAt',
    'service.reclaim',
    'service.failure',
    'service.reference',
    'service.remarks',
    'service.warranty',
    'service.securityStrap',
    'product.id',
    'serviceState.id',
    'serviceState.name',
    'servicePriority.id',
    'failureType.id',
  ];

  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceRepository.find({
        relations: ['product', 'state', 'priority', 'failureType'],
      });
      // return await this.serviceRepository
      //   .createQueryBuilder('service')
      //   .select(this.querySelect)
      //   .innerJoin('service.product', 'product')
      //   .innerJoin('service.state', 'serviceState')
      //   .innerJoin('service.priority', 'servicePriority')
      //   .innerJoin('service.failureType', 'failureType')
      //   .where('serviceState.id != 9')
      //   .getMany();
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

  async create(body: CreateServiceDto): Promise<void> {
    try {
      await this.serviceRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Service with id: ${id} not found`, 404);
      await this.serviceRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
