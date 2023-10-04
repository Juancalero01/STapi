import { ProductEntity } from 'src/modules/product/product.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';

export class CreateServiceDto {
  reclaim: string;
  failure: string;
  reference?: string;
  remarks: string;
  dateEntry: Date;
  warranty: boolean;
  product: ProductEntity;
  state: ServiceStateEntity;
}
