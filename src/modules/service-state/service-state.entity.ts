import { ServiceEntity } from 'src/modules/service/service.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('service_states')
export class ServiceStateEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @OneToMany(() => ServiceEntity, (service) => service.state)
  service: ServiceEntity;
}