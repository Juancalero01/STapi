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
import { ProductPartHistoryService } from './product-part-history.service';
import { CreateProductPartHistoryDto } from './dto/create-product-part-history.dto';
import { UpdateProductPartHistoryDto } from './dto/update-product-part-history.dto';
import { Roles } from '../role/common/role.decorator';
import { RolesGuard } from '../role/common/role.guard';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { ProductPartHistoryEntity } from './product-part-history.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product-part-history')
export class ProductPartHistoryController {
  constructor(
    private readonly productPartHistoryService: ProductPartHistoryService,
  ) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ProductPartHistoryEntity[]> {
    try {
      return await this.productPartHistoryService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductPartHistoryEntity> {
    try {
      return await this.productPartHistoryService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async create(@Body() body: CreateProductPartHistoryDto): Promise<void> {
    try {
      return await this.productPartHistoryService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductPartHistoryDto,
  ): Promise<void> {
    try {
      return await this.productPartHistoryService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
