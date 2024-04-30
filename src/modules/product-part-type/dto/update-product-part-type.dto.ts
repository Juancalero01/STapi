import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPartTypeDto } from './create-product-part-type.dto';

export class UpdateProductPartTypeDto extends PartialType(
  CreateProductPartTypeDto,
) {
  isActive?: boolean;
}
