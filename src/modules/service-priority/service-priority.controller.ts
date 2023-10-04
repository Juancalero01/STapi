import { Controller, Get, Param } from '@nestjs/common';
import { ServicePriorityService } from './service-priority.service';

@Controller('service-priority')
export class ServicePriorityController {
  constructor(
    private readonly servicePriorityService: ServicePriorityService,
  ) {}
  @Get()
  findAll() {
    return this.servicePriorityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePriorityService.findOne(+id);
  }
}
