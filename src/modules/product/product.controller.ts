import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(id: number) {
    try {
      const product = await this.productService.findOne(id);
      if (!product) throw new HttpException(`Product not found`, 404);
      return product;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() createProductDto: CreateProductDto): Promise<void> {
    try {
      if (await this.productService.create(createProductDto))
        throw new HttpException('Product already exists', 409);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    try {
      if (!(await this.productService.update(id, updateProductDto)))
        throw new HttpException('Product not found', 404);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/import')
  async importClients(
    @Body()
    products: CreateProductDto[],
  ): Promise<void> {
    try {
      await this.productService.importProducts(products);
    } catch (error) {
      throw error;
    }
  }
}
