import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';
import { RoleEntity } from '../role/role.entity';
import { ServiceNoteEntity } from '../service-note/service-note.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.user, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  role: RoleEntity;

  @OneToMany(
    () => ServiceHistoryEntity,
    (serviceHistory) => serviceHistory.user,
  )
  serviceHistory: ServiceHistoryEntity[];

  @OneToMany(() => ServiceNoteEntity, (note) => note.user)
  serviceNote: ServiceNoteEntity;
}
