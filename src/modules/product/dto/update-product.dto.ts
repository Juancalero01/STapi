import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional({ message: 'State is optional' })
  @IsBoolean({ message: 'State must be a boolean' })
  state?: boolean;
}
