import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-type-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
  @IsOptional({ message: 'State is optional' })
  @IsBoolean({ message: 'State must be a boolean' })
  state?: boolean;
}
