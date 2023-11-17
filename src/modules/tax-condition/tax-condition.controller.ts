import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaxConditionService } from './tax-condition.service';
import { TaxConditionEntity } from './tax-condition.entity';
import { CreateTaxConditionDto } from './dto/create-tax-condition.dto';
import { UpdateTaxConditionDto } from './dto/update-tax-condition.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('tax-condition')
export class TaxConditionController {
  constructor(private readonly taxConditionService: TaxConditionService) {}

  @Get('/')
  async findAll(): Promise<TaxConditionEntity[]> {
    try {
      return await this.taxConditionService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.taxConditionService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateTaxConditionDto) {
    try {
      return await this.taxConditionService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaxConditionDto,
  ) {
    try {
      return await this.taxConditionService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
