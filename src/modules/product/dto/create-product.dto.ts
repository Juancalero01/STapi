import { ClientEntity } from 'src/modules/client/client.entity';
import { ProductTypeEntity } from 'src/modules/product-type/product-type.entity';

export class CreateProductDto {
  serial: string;
  reference: string;
  deliveryDate: Date;
  productType: ProductTypeEntity;
  client: ClientEntity;
}
