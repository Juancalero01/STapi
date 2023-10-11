import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';

@Entity('failure_types')
export class FailureTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @OneToMany(() => ServiceEntity, (service) => service.failureType)
  service: ServiceEntity;
}
