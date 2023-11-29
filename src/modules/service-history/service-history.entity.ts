import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { UserEntity } from '../user/user.entity';

@Entity('service_histories')
export class ServiceHistoryEntity extends BaseEntity {
  @ManyToOne(() => ServiceStateEntity, (state) => state.currentServiceHistory)
  stateCurrent: ServiceStateEntity;

  @ManyToOne(() => ServiceStateEntity, (state) => state.nextServiceHistory)
  stateNext: ServiceStateEntity;

  @Column({ type: 'varchar', length: 500, nullable: false })
  remarks: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceHistory)
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, (user) => user.serviceHistory)
  user: UserEntity;

  @Column({ type: 'datetime', nullable: false })
  dateEntry: Date;
}
