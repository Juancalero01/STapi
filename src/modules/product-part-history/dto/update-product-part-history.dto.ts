import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPartHistoryDto } from './create-product-part-history.dto';

export class UpdateProductPartHistoryDto extends PartialType(
  CreateProductPartHistoryDto,
) {
  isActive?: boolean;
}
