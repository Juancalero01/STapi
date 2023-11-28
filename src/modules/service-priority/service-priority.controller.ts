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
import { ServicePriorityService } from './service-priority.service';
import { CreateServicePriorityDto } from './dto/create-service-priority.dto';
import { UpdateServicePriorityDto } from './dto/update-service-priority.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('service-priority')
export class ServicePriorityController {
  constructor(
    private readonly servicePriorityService: ServicePriorityService,
  ) {}
  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll() {
    try {
      return await this.servicePriorityService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.servicePriorityService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  async create(@Body() body: CreateServicePriorityDto) {
    try {
      return await this.servicePriorityService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServicePriorityDto,
  ) {
    try {
      return await this.servicePriorityService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
