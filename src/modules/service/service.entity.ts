import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ServicePriorityEntity } from '../service-priority/service-priority.entity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  reclaim: string;
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  failure: string;
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  reference: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  remarks: string;
  @Column({ type: 'date', nullable: false })
  dateEntry: Date;
  @Column({ type: 'boolean', nullable: true, default: false })
  warranty: boolean;
  @ManyToOne(() => ProductEntity, (product) => product.service)
  product: ProductEntity;
  @ManyToOne(() => ServiceStateEntity, (serviceState) => serviceState.service)
  state: ServiceStateEntity;
  @ManyToOne(
    () => ServicePriorityEntity,
    (servicePriority) => servicePriority.service,
  )
  priority: ServicePriorityEntity;
}
