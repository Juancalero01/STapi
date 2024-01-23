import { BaseEntity } from 'src/shared/entities/base.entity';
import { ServiceStateEntity } from '../service-state/service-state.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';

@Entity('service_notes')
export class ServiceNoteEntity extends BaseEntity {
  @ManyToOne(() => ServiceStateEntity, (state) => state.stateServiceNote, {
    eager: true,
  })
  state: ServiceStateEntity;

  @ManyToOne(() => UserEntity, (user) => user.serviceNote, {
    eager: true,
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(() => ServiceHistoryEntity, (history) => history.serviceNote, {
    nullable: false,
  })
  serviceHistory: ServiceHistoryEntity;

  @Column({ type: 'datetime', nullable: false })
  dateEntry: Date;

  @Column({ type: 'varchar', length: 500, nullable: false })
  comment: string;
}
