import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeEntity } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-type-product.dto';
import { UpdateProductTypeDto } from './dto/update-type-product.dto';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Get('/')
  async findAll(): Promise<ProductTypeEntity[]> {
    try {
      const productTypes = await this.productTypeService.findAll();
      return productTypes;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ProductTypeEntity> {
    try {
      const productType = await this.productTypeService.findOne(id);
      if (!productType) throw new HttpException(`Product Type not found`, 404);
      return productType;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(
    @Body() createProductTypeDto: CreateProductTypeDto,
  ): Promise<void> {
    try {
      if (await this.productTypeService.create(createProductTypeDto))
        throw new HttpException('Product Type already exists', 409);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<void> {
    try {
      if (!(await this.productTypeService.update(id, updateProductTypeDto)))
        throw new HttpException(`Product Type not found`, 404);
    } catch (error) {
      throw error;
    }
  }

  @Post('/import')
  async importProductTypes(
    @Body()
    productTypes: CreateProductTypeDto[],
  ): Promise<void> {
    try {
      await this.productTypeService.importProductTypes(productTypes);
    } catch (error) {
      throw error;
    }
  }
}
