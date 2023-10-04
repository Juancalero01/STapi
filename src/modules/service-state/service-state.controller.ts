import { Controller, Get, Param } from '@nestjs/common';
import { ServiceStateService } from './service-state.service';

@Controller('service-state')
export class ServiceStateController {
  constructor(private readonly serviceStateService: ServiceStateService) {}
  @Get()
  findAll() {
    return this.serviceStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceStateService.findOne(+id);
  }
}
