import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductPartTypeService } from './product-part-type.service';
import { CreateProductPartTypeDto } from './dto/create-product-part-type.dto';
import { UpdateProductPartTypeDto } from './dto/update-product-part-type.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product-part-type')
export class ProductPartTypeController {
  constructor(
    private readonly productPartTypeService: ProductPartTypeService,
  ) {}

  @Get('/')
  @Roles('ADMINISTRADOR')
  findAll() {
    return this.productPartTypeService.findAll();
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productPartTypeService.findOne(id);
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  create(@Body() createProductPartTypeDto: CreateProductPartTypeDto) {
    return this.productPartTypeService.create(createProductPartTypeDto);
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductPartTypeDto,
  ) {
    return this.productPartTypeService.update(id, body);
  }
}
