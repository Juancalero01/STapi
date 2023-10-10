import { Injectable } from '@nestjs/common';
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
      return await this.failureTypeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneByName(name: string): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeRepository.findOne({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  async create(
    createFailureTypeDto: CreateFailureTypeDto,
  ): Promise<CreateFailureTypeDto> {
    try {
      const failureTypeFound = await this.findOneByName(
        createFailureTypeDto.name,
      );
      if (!failureTypeFound)
        await this.failureTypeRepository.save(createFailureTypeDto);
      return failureTypeFound;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateFailureTypeDto: UpdateFailureTypeDto,
  ): Promise<UpdateFailureTypeDto> {
    try {
      const productTypeFound = await this.findOne(id);
      if (productTypeFound)
        await this.failureTypeRepository.update(id, updateFailureTypeDto);
      return productTypeFound;
    } catch (error) {
      throw error;
    }
  }

  async importFailureTypes(
    failureTypes: CreateFailureTypeDto[],
  ): Promise<void> {
    try {
      await this.failureTypeRepository.save(failureTypes);
    } catch (error) {
      throw error;
    }
  }
}
