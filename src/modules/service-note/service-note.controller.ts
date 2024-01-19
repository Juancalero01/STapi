import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ServiceNoteService } from './service-note.service';
import { CreateServiceNoteDto } from './dto/create-service-note.dto';
import { UpdateServiceNoteDto } from './dto/update-service-note.dto';
import { RolesGuard } from '../role/common/role.guard';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { Roles } from '../role/common/role.decorator';
import { ServiceNoteEntity } from './service-note.entity';

// @UseGuards(JwtGuard, RolesGuard)
@Controller('service-note')
export class ServiceNoteController {
  constructor(private readonly serviceNoteService: ServiceNoteService) {}

  @Get('/')
  // @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ServiceNoteEntity[]> {
    try {
      return this.serviceNoteService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  // @Roles('ADMINISTRADOR', 'TECNICO')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceNoteEntity> {
    try {
      return this.serviceNoteService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('sh/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  findByServiceHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceNoteEntity[]> {
    try {
      return this.serviceNoteService.findByServiceHistory(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  // @Roles('ADMINISTRADOR', 'TECNICO')
  create(@Body() body: CreateServiceNoteDto) {
    try {
      return this.serviceNoteService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  // @Roles('ADMINISTRADOR', 'TECNICO')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceNoteDto,
  ) {
    return this.serviceNoteService.update(id, body);
  }
}
