import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPieceDto } from './create-product-piece.dto';

export class UpdateProductPieceDto extends PartialType(CreateProductPieceDto) {
  isActive?: boolean;
}
