import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { ServiceStateEntity } from '../service-state/service-state.entity';

@Entity('service_histories')
export class ServiceHistoryEntity extends BaseEntity {
  @ManyToOne(() => ServiceStateEntity, (state) => state.currentServiceHistory)
  stateCurrent: ServiceStateEntity;

  @ManyToOne(() => ServiceStateEntity, (state) => state.nextServiceHistory)
  stateNext: ServiceStateEntity;

  @Column({ type: 'varchar', length: 255, nullable: false })
  remarks: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceHistory)
  service: ServiceEntity;
}
