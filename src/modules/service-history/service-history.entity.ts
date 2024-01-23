import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ServiceEntity } from '../service/service.entity';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { UserEntity } from '../user/user.entity';
import { ServiceNoteEntity } from '../service-note/service-note.entity';

@Entity('service_histories')
export class ServiceHistoryEntity extends BaseEntity {
  @ManyToOne(() => ServiceStateEntity, (state) => state.currentServiceHistory, {
    eager: true,
  })
  stateCurrent: ServiceStateEntity;

  @ManyToOne(() => ServiceStateEntity, (state) => state.nextServiceHistory, {
    eager: true,
    nullable: true,
  })
  stateNext: ServiceStateEntity;

  @Column({ type: 'varchar', length: 500, nullable: true })
  remarks: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceHistory, {
    nullable: true,
  })
  service: ServiceEntity;

  @ManyToOne(() => UserEntity, (user) => user.serviceHistory, {
    eager: true,
    nullable: true,
  })
  user: UserEntity;

  @Column({ type: 'datetime', nullable: true })
  dateEntry: Date;

  @OneToMany(() => ServiceNoteEntity, (note) => note.serviceHistory, {
    eager: true,
  })
  serviceNote: ServiceNoteEntity[];
}
