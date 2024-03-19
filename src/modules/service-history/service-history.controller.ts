import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service-history.dto';
import { ServiceHistoryEntity } from './service-history.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { ServiceEntity } from '../service/service.entity';
import { UserEntity } from '../user/user.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/act')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findActivities(): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryService.findActivities();
    } catch (error) {
      throw error;
    }
  }

  @Get('r/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findLastHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryService.findLastHistory(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async create(@Body() body: CreateServiceHistoryDto) {
    try {
      return await this.serviceHistoryService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
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
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findService(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity[]> {
    try {
      return await this.serviceHistoryService.findService(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('r/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findLastDateEntry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceHistoryEntity> {
    try {
      return await this.serviceHistoryService.findLastDateEntry(id);
    } catch (error) {
      throw error;
    }
  }

  //!Testear
  @Post('/many')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async createServices(
    @Body()
    body: {
      dateEntry: Date;
      stateCurrent: ServiceStateEntity;
      stateNext: ServiceStateEntity;
      remarks: string;
      service: ServiceEntity;
      user: UserEntity;
    }[],
  ): Promise<void> {
    try {
      return await this.serviceHistoryService.createHistories(body);
    } catch (error) {
      throw error;
    }
  }
}
