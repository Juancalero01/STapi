import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';

@Entity('service_histories')
export class ServiceHistoryEntity extends BaseEntity {
  @Column()
  stateCurrent: string;

  @Column()
  statePrevious: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  remarks: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceHistory)
  service: ServiceEntity;
}
