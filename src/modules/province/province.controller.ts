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

@UseGuards(JwtGuard)
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/')
  async findAll(): Promise<ProvinceEntity[]> {
    try {
      return await this.provinceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
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
  async create(@Body() body: CreateProvinceDto) {
    try {
      return await this.provinceService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
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
