import { FailureTypeEntity } from 'src/modules/failure-type/failure-type.entity';
import { ProductEntity } from 'src/modules/product/product.entity';
import { ServicePriorityEntity } from 'src/modules/service-priority/service-priority.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';

export class CreateServiceDto {
  dateEntry: Date;
  reclaim: string;
  startReference: string;
  endReference: string;
  orderNumber: string;
  quoteNumber: string;
  failure: string;
  remarks: string;
  warranty: boolean;
  securityStrap: boolean;

  // With relations
  product: ProductEntity;
  state: ServiceStateEntity;
  priority: ServicePriorityEntity;
  failureTypes: FailureTypeEntity[];
}
