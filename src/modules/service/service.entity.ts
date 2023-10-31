import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ServicePriorityEntity } from '../service-priority/service-priority.entity';
import { FailureTypeEntity } from '../failure-type/failure-type.entity';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @Column({ type: 'date', nullable: false })
  dateEntry: Date;

  @Column({ type: 'varchar', nullable: false })
  reclaim: string;

  @ManyToOne(() => ServiceStateEntity, (serviceState) => serviceState.service, {
    eager: true,
  })
  state: ServiceStateEntity;

  @ManyToOne(() => ProductEntity, (product) => product.service, {
    eager: true,
  })
  product: ProductEntity;

  @ManyToOne(
    () => ServicePriorityEntity,
    (servicePriority) => servicePriority.service,
    {
      eager: true,
    },
  )
  priority: ServicePriorityEntity;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  reference: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  securityStrap: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  failure: string;

  @ManyToOne(() => FailureTypeEntity, (failureType) => failureType.service, {
    eager: true,
  })
  failureType: FailureTypeEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remarks: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  warranty: boolean;

  @OneToMany(
    () => ServiceHistoryEntity,
    (serviceHistory) => serviceHistory.service,
  )
  serviceHistory: ServiceHistoryEntity[];
}
