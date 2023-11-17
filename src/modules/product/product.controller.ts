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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('s/:serial')
  async findOneSerial(@Param('serial') serial: string): Promise<ProductEntity> {
    try {
      return await this.productService.findOneSerial(serial);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateProductDto): Promise<void> {
    try {
      await this.productService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<void> {
    try {
      await this.productService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
