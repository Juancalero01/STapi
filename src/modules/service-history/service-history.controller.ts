import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service-history.dto';
import { ServiceHistoryEntity } from './service-history.entity';

@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) {}

  @Get('/')
  async findAll(): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryService.findOne(id);
    } catch (error) {}
  }

  @Post('/')
  async create(@Body() body: CreateServiceHistoryDto) {
    try {
      return await this.serviceHistoryService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceHistoryDto,
  ) {
    try {
      return await this.serviceHistoryService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Get('s/:id')
  async findService(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryService.findService(id);
    } catch (error) {
      throw error;
    }
  }
}
