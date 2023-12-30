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
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @Roles('ADMINISTRADOR')
  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('s/:serial')
  @Roles('ADMINISTRADOR')
  async findOneSerial(@Param('serial') serial: string): Promise<ProductEntity> {
    try {
      return await this.productService.findOneSerial(serial);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  async create(@Body() body: CreateProductDto): Promise<void> {
    try {
      return await this.productService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<void> {
    try {
      return await this.productService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
