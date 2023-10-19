import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { FailureTypeService } from './failure-type.service';
import { CreateFailureTypeDto } from './dto/create-failure-type.dto';
import { UpdateFailureTypeDto } from './dto/update-failure-type.dto';
import { FailureTypeEntity } from './failure-type.entity';

@Controller('failure-type')
export class FailureTypeController {
  constructor(private readonly failureTypeService: FailureTypeService) {}

  @Get('/')
  async findAll(): Promise<FailureTypeEntity[]> {
    try {
      return await this.failureTypeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateFailureTypeDto): Promise<void> {
    try {
      await this.failureTypeService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFailureTypeDto,
  ): Promise<void> {
    try {
      await this.failureTypeService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
