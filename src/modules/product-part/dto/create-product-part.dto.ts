import { ProductPartTypeEntity } from 'src/modules/product-part-type/product-part-type.entity';
import { ProductEntity } from 'src/modules/product/product.entity';

export class CreateProductPartDto {
  serial: string;
  product: ProductEntity;
  productPartType: ProductPartTypeEntity;
}
