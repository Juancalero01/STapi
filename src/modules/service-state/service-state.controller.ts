import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ServiceStateService } from './service-state.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('service-state')
export class ServiceStateController {
  constructor(private readonly serviceStateService: ServiceStateService) {}
  @Get('/')
  async findAll() {
    try {
      return await this.serviceStateService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.serviceStateService.findOne(id);
    } catch (error) {
      throw error;
    }
  }
}
