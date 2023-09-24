import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxConditionEntity } from './tax-condition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxConditionService {
  constructor(
    @InjectRepository(TaxConditionEntity)
    private readonly taxConditionRepository: Repository<TaxConditionEntity>,
  ) {}

  async findAll(): Promise<TaxConditionEntity[]> {
    try {
      return await this.taxConditionRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<TaxConditionEntity> {
    try {
      return await this.taxConditionRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
