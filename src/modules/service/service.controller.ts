import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceEntity } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
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

  @Get('p/:id')
  async findAllByProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.findAllByProduct(id);
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

  @Put('s/:id')
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() state: ServiceStateEntity,
  ): Promise<void> {
    try {
      await this.serviceService.updateState(id, state);
    } catch (error) {
      throw error;
    }
  }
}
