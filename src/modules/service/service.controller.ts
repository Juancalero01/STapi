import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceEntity } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/r')
  async findLastReclaim(): Promise<string | null> {
    try {
      return await this.serviceService.findLastReclaim();
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceEntity> {
    try {
      return await this.serviceService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateServiceDto): Promise<void> {
    try {
      await this.serviceService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceDto,
  ): Promise<void> {
    try {
      await this.serviceService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
