import { ProductEntity } from 'src/modules/product/product.entity';

export class CreateProductPieceDto {
  hardwareId: string;
  product: ProductEntity;
}
