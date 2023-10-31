import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServiceHistoryEntity } from '../service-history/service-history.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @OneToMany(
    () => ServiceHistoryEntity,
    (serviceHistory) => serviceHistory.user,
  )
  serviceHistory: ServiceHistoryEntity[];
}