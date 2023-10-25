import { FailureTypeEntity } from 'src/modules/failure-type/failure-type.entity';
import { ProductEntity } from 'src/modules/product/product.entity';
import { ServicePriorityEntity } from 'src/modules/service-priority/service-priority.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';

export class CreateServiceDto {
  reclaim: string;
  reference?: string;
  failure: string;
  remarks: string;
  dateEntry: Date;
  warranty: boolean;
  securityStrap: boolean;
  product: ProductEntity;
  state: ServiceStateEntity;
  priority: ServicePriorityEntity;
  failureType: FailureTypeEntity;
}
