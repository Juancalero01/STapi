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
import { ProvinceService } from './province.service';
import { ProvinceEntity } from './province.entity';
import { CreateProvinceDto } from './dto/create-province.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ProvinceEntity[]> {
    try {
      return await this.provinceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProvinceEntity> {
    try {
      return await this.provinceService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async create(@Body() body: CreateProvinceDto) {
    try {
      return await this.provinceService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateProvinceDto,
  ) {
    try {
      return await this.provinceService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
