import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceEntity } from './province.entity';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/')
  async findAll(): Promise<ProvinceEntity[]> {
    try {
      const provinces = await this.provinceService.findAll();
      if (!provinces.length)
        throw new HttpException('Provinces not found', 404);
      return provinces;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProvinceEntity> {
    try {
      const province = this.provinceService.findOne(id);
      if (!province) throw new HttpException('Province not found', 404);
      return province;
    } catch (error) {
      throw error;
    }
  }
}
