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
import { FailureTypeService } from './failure-type.service';
import { CreateFailureTypeDto } from './dto/create-failure-type.dto';
import { UpdateFailureTypeDto } from './dto/update-failure-type.dto';
import { FailureTypeEntity } from './failure-type.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('failure-type')
export class FailureTypeController {
  constructor(private readonly failureTypeService: FailureTypeService) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<FailureTypeEntity[]> {
    try {
      return await this.failureTypeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FailureTypeEntity> {
    try {
      return await this.failureTypeService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async create(@Body() body: CreateFailureTypeDto): Promise<void> {
    try {
      await this.failureTypeService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFailureTypeDto,
  ): Promise<void> {
    try {
      await this.failureTypeService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
