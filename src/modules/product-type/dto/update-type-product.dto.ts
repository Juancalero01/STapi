import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-type-product.dto';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
  isActive?: boolean;
}
