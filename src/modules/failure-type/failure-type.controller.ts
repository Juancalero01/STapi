import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  Put,
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
      const failureTypes = await this.failureTypeService.findAll();
      return failureTypes;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<FailureTypeEntity> {
    try {
      const faiulreType = await this.failureTypeService.findOne(id);
      return faiulreType;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(
    @Body() createFailureTypeDto: CreateFailureTypeDto,
  ): Promise<void> {
    try {
      if (await this.failureTypeService.create(createFailureTypeDto))
        throw new HttpException('Failure type already exists', 409);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateFailureTypeDto: UpdateFailureTypeDto,
  ) {
    try {
      if (!(await this.failureTypeService.update(id, updateFailureTypeDto)))
        throw new HttpException('Failure type not found', 404);
    } catch (error) {
      throw error;
    }
  }

  @Post('/import')
  async importProductTypes(
    @Body()
    failureTypes: CreateFailureTypeDto[],
  ): Promise<void> {
    try {
      await this.failureTypeService.importFailureTypes(failureTypes);
    } catch (error) {
      throw error;
    }
  }
}
