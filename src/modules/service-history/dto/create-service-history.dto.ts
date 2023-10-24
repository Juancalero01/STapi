import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { ServiceEntity } from 'src/modules/service/service.entity';

export class CreateServiceHistoryDto {
  stateCurrent: ServiceStateEntity;
  stateNext: ServiceStateEntity;
  remarks: string;
  service: ServiceEntity;
}
