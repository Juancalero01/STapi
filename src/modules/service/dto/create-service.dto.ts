import { ProductEntity } from 'src/modules/product/product.entity';
import { ServicePriorityEntity } from 'src/modules/service-priority/service-priority.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';

export class CreateServiceDto {
  reclaim: string;
  failure: string;
  reference?: string;
  remarks: string;
  dateEntry: Date; //Posible eliminación ya que existe la fecha de creación en la entidad
  warranty: boolean;
  product: ProductEntity;
  state: ServiceStateEntity;
  priority: ServicePriorityEntity;
}
