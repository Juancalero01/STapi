import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductPartService } from './product-part.service';
import { CreateProductPartDto } from './dto/create-product-part.dto';
// import { UpdateProductPartDto } from './dto/update-product-part.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';
import { ProductPartEntity } from './product-part.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product-part')
export class ProductPartController {
  constructor(private readonly productPartService: ProductPartService) {}

  @Get('/')
  @Roles('ADMINISTRADOR', 'TECNICO')
  findAll() {
    return this.productPartService.findAll();
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productPartService.findOne(id);
  }

  @Get('s/:serial')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async findOneSerial(
    @Param('serial') serial: string,
  ): Promise<ProductPartEntity> {
    try {
      return await this.productPartService.findOneSerial(serial);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  create(@Body() body: CreateProductPartDto[]) {
    return this.productPartService.create(body);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductPartDto: UpdateProductPartDto,
  // ) {
  //   return this.productPartService.update(+id, updateProductPartDto);
  // }
}
