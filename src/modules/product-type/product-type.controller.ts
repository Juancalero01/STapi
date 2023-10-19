import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeEntity } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Get('/')
  async findAll(): Promise<ProductTypeEntity[]> {
    try {
      return await this.productTypeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateProductTypeDto): Promise<void> {
    try {
      await this.productTypeService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductTypeDto,
  ): Promise<void> {
    try {
      await this.productTypeService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
