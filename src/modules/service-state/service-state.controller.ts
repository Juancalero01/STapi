import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiceStateService } from './service-state.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('service-state')
export class ServiceStateController {
  constructor(private readonly serviceStateService: ServiceStateService) {}
  @Get('/')
  @Roles('ADMINISTRADOR')
  async findAll() {
    try {
      return await this.serviceStateService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.serviceStateService.findOne(id);
    } catch (error) {
      throw error;
    }
  }
}
