import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';

@Entity('failure_types')
export class FailureTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @ManyToMany(() => ServiceEntity, (service) => service.failureTypes)
  services: ServiceEntity[];
}
