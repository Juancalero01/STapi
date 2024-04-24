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
import { ProductPieceService } from './product-piece.service';
import { CreateProductPieceDto } from './dto/create-product-piece.dto';
import { UpdateProductPieceDto } from './dto/update-product-piece.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';
import { ProductPieceEntity } from './product-piece.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product-piece')
export class ProductPieceController {
  constructor(private readonly productPieceService: ProductPieceService) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findAll(): Promise<ProductPieceEntity[]> {
    try {
      return await this.productPieceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductPieceEntity> {
    try {
      return this.productPieceService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  //TODO: Modificar e implementar el post y el update de los datos
  // @Post()
  // @Roles('ADMINISTRADOR')
  // create(@Body() body: CreateProductPieceDto[]) {
  //   try {
  //     return this.productPieceService.create(body);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductPieceDto: UpdateProductPieceDto,
  // ) {
  //   return this.productPieceService.update(+id, updateProductPieceDto);
  // }
}
