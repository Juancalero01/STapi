import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxConditionEntity } from './tax-condition.entity';
import { Repository } from 'typeorm';
import { CreateTaxConditionDto } from './dto/create-tax-condition.dto';
import { UpdateTaxConditionDto } from './dto/update-tax-condition.dto';

@Injectable()
export class TaxConditionService {
  constructor(
    @InjectRepository(TaxConditionEntity)
    private readonly taxConditionRepository: Repository<TaxConditionEntity>,
  ) {}

  async findAll(): Promise<TaxConditionEntity[]> {
    try {
      return await this.taxConditionRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<TaxConditionEntity> {
    try {
      return await this.taxConditionRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneName(name: string): Promise<TaxConditionEntity> {
    try {
      return await this.taxConditionRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateTaxConditionDto): Promise<void> {
    try {
      if (await this.findOneName(body.name))
        throw new HttpException(
          `Tax Condition with name ${body.name} already exists`,
          409,
        );
      await this.taxConditionRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateTaxConditionDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Tax Condition with id ${id} not found`, 404);
      const taxCondition = await this.findOneName(body.name);
      if (taxCondition && taxCondition.id !== id)
        throw new HttpException(
          `Tax Condition with name ${body.name} already exists`,
          409,
        );
      await this.taxConditionRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
