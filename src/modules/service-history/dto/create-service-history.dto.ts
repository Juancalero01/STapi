import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { ServiceEntity } from 'src/modules/service/service.entity';

export class CreateServiceHistoryDto {
  dateEntry: Date;
  stateCurrent: ServiceStateEntity;
  stateNext: ServiceStateEntity;
  remarks: string;
  service: ServiceEntity;
}
