import { HttpException, Injectable } from '@nestjs/common';
import { CreateFailureTypeDto } from './dto/create-failure-type.dto';
import { UpdateFailureTypeDto } from './dto/update-failure-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FailureTypeEntity } from './failure-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FailureTypeService {
  constructor(
    @InjectRepository(FailureTypeEntity)
    private readonly failureTypeRepository: Repository<FailureTypeEntity>,
  ) {}

  async findAll(): Promise<FailureTypeEntity[]> {
    try {
      return await this.failureTypeRepository.find({
        select: ['id', 'name', 'isActive'],
        order: { id: 'ASC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeRepository.findOne({
        where: { id },
        select: ['id', 'name', 'isActive'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneName(name: string): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateFailureTypeDto): Promise<void> {
    try {
      if (await this.findOneName(body.name))
        throw new HttpException(
          `FailureType with name ${body.name} already exists`,
          409,
        );
      await this.failureTypeRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateFailureTypeDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`FailureType with id ${id} not found`, 404);
      const failureTypeFound = await this.findOneName(body.name);
      if (failureTypeFound && failureTypeFound.id !== id)
        throw new HttpException(
          `FailureType with name ${body.name} already exists`,
          409,
        );
      await this.failureTypeRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
