import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceEntity } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/')
  async findAll(): Promise<ServiceEntity[]> {
    try {
      const services = await this.serviceService.findAll();
      if (!services) throw new HttpException('Services not found', 404);
      return services;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ServiceEntity> {
    try {
      const service = await this.serviceService.findOne(id);
      if (!service) throw new HttpException('Service not found', 404);
      return service;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateServiceDto): Promise<void> {
    try {
      if (await this.serviceService.create(body))
        // refactorizar este endpoint para que devuelva si el servicio ya existe
        throw new HttpException('Service not created', 400);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateServiceDto,
  ): Promise<void> {
    try {
      if (!(await this.serviceService.update(id, body)))
        // refactorizar este endpoint para que devuelva si el servicio no se encuentra
        throw new HttpException('Service not updated', 400);
    } catch (error) {
      throw error;
    }
  }
}
