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
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';
import { ServicePriorityEntity } from '../service-priority/service-priority.entity';
import { ProductEntity } from '../product/product.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Put('/umany')
  @Roles('ADMINISTRADOR')
  async updateServices(
    @Body()
    body: CreateServiceDto[],
  ): Promise<void> {
    try {
      return await this.serviceService.updateServices(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('/r')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findLastReclaim(): Promise<string | null> {
    try {
      return await this.serviceService.findLastReclaim();
    } catch (error) {
      throw error;
    }
  }

  @Post('/i')
  @Roles('ADMINISTRADOR')
  async getServiceIndicators(@Body() body: any): Promise<any> {
    try {
      return await this.serviceService.getServiceIndicators(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('p/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAllByProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.findAllByProduct(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('ss/:serial')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async getServicesByProductSerial(
    @Param('serial') serial: string,
  ): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.getServicesByProductSerial(serial);
    } catch (error) {
      throw error;
    }
  }

  @Get('sr/:reclaim')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async getServicesByReclaim(
    @Param('reclaim') reclaim: string,
  ): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.getServicesByReclaim(reclaim);
    } catch (error) {
      throw error;
    }
  }

  @Get('/all')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAllActiveServices(): Promise<ServiceEntity[]> {
    try {
      return await this.serviceService.findAllActiveServices();
    } catch (error) {
      throw error;
    }
  }

  @Get('/h')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async getServiceMain(): Promise<{
    services: number;
    servicesActive: number;
    servicesRepair: number;
    servicesWithOutRepair: number;
  }> {
    try {
      return await this.serviceService.getServiceMain();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceEntity> {
    try {
      return await this.serviceService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async create(@Body() body: CreateServiceDto): Promise<void> {
    try {
      return await this.serviceService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceDto,
  ): Promise<void> {
    try {
      return await this.serviceService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/s/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body('state') state: ServiceStateEntity,
  ): Promise<void> {
    try {
      return await this.serviceService.updateState(id, state);
    } catch (error) {
      throw error;
    }
  }

  @Put('/d/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async setDateDeparture(
    @Param('id', ParseIntPipe) id: number,
    @Body('dateDeparture') dateDeparture: Date,
  ): Promise<void> {
    try {
      return await this.serviceService.setDateDeparture(id, dateDeparture);
    } catch (error) {
      throw error;
    }
  }

  @Put('/rt/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async setRepairedTime(
    @Param('id', ParseIntPipe) id: number,
    @Body('repairedTime') repairedTime: number,
  ): Promise<void> {
    try {
      return await this.serviceService.setRepairedTime(id, repairedTime);
    } catch (error) {
      throw error;
    }
  }

  @Post('/many')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async createServices(
    @Body()
    body: {
      dateEntry: Date;
      priority: ServicePriorityEntity;
      product: ProductEntity;
      reclaim: string;
      securityStrap: boolean;
      startReference: string;
      state: ServiceStateEntity;
      warranty: boolean;
    }[],
  ): Promise<void> {
    try {
      return await this.serviceService.createServices(body);
    } catch (error) {
      throw error;
    }
  }
}
