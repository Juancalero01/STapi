import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ServicePriorityEntity } from '../service-priority/service-priority.entity';
import { FailureTypeEntity } from '../failure-type/failure-type.entity';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @Column({ type: 'datetime', nullable: false })
  dateEntry: Date;

  @Column({ type: 'datetime', nullable: true })
  dateDeparture: Date;

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
  startReference: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  endReference: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  orderNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  quoteNumber: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  securityStrap: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  failure: string;

  @ManyToMany(() => FailureTypeEntity, (failureType) => failureType.services, {
    nullable: true,
  })
  @JoinTable()
  failureTypes: FailureTypeEntity[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  remarks: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  warranty: boolean;

  @Column({ type: 'integer', nullable: true })
  repairedTime: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  bitrixUrl: string;

  @OneToMany(
    () => ServiceHistoryEntity,
    (serviceHistory) => serviceHistory.service,
  )
  serviceHistory: ServiceHistoryEntity[];
}
