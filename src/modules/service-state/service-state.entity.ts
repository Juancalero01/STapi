import { ServiceEntity } from 'src/modules/service/service.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';
import { ServiceNoteEntity } from '../service-note/service-note.entity';

@Entity('service_states')
export class ServiceStateEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @OneToMany(() => ServiceEntity, (service) => service.state)
  service: ServiceEntity;

  @OneToMany(() => ServiceHistoryEntity, (history) => history.stateCurrent)
  currentServiceHistory: ServiceHistoryEntity[];

  @OneToMany(() => ServiceHistoryEntity, (history) => history.stateNext)
  nextServiceHistory: ServiceHistoryEntity[];

  @OneToMany(() => ServiceNoteEntity, (note) => note.state)
  stateServiceNote: ServiceNoteEntity;
}
