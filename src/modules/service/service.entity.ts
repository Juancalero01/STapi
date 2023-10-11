import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ServicePriorityEntity } from '../service-priority/service-priority.entity';
import { FailureTypeEntity } from '../failure-type/failure-type.entity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  // fecha de ingreso del servicio
  @Column({ type: 'date', nullable: false })
  dateEntry: Date;

  // numero de reclamo del producto a reparar
  @Column({ type: 'varchar', nullable: false })
  reclaim: string;

  // Estado del servicio
  @ManyToOne(() => ServiceStateEntity, (serviceState) => serviceState.service)
  state: ServiceStateEntity;

  // Producto asociado al servicio
  @ManyToOne(() => ProductEntity, (product) => product.service)
  product: ProductEntity;

  // Prioridad del servicio
  @ManyToOne(
    () => ServicePriorityEntity,
    (servicePriority) => servicePriority.service,
  )
  priority: ServicePriorityEntity;

  // remito del producto a reparar
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  reference: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  securityStrap: boolean;

  // falla del producto a reparar
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  failure: string;

  @ManyToOne(() => FailureTypeEntity, (failureType) => failureType.service)
  failureType: FailureTypeEntity;

  // observaciones del servicio
  @Column({ type: 'varchar', length: 255, nullable: false })
  remarks: string;

  // garantia del servicio
  @Column({ type: 'boolean', nullable: true, default: false })
  warranty: boolean;
}
