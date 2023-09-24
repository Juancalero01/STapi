import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { TaxConditionService } from './tax-condition.service';
import { TaxConditionEntity } from './tax-condition.entity';

@Controller('tax-condition')
export class TaxConditionController {
  constructor(private readonly taxConditionService: TaxConditionService) {}

  @Get('/')
  async findAll(): Promise<TaxConditionEntity[]> {
    try {
      const taxConditions = await this.taxConditionService.findAll();
      if (!taxConditions.length)
        throw new HttpException('Tax Conditions not found', 404);
      return taxConditions;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const taxCondition = await this.taxConditionService.findOne(id);
      if (!taxCondition)
        throw new HttpException('Tax Condition not found', 404);
      return taxCondition;
    } catch (error) {
      throw error;
    }
  }
}
