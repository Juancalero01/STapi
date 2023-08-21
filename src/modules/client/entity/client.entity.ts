import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 120, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  contact: string;

  @Column({ type: 'varchar', length: 120, unique: true, nullable: true })
  email: string;

  @Column({ type: 'char', length: 20, unique: true, nullable: true })
  phone: string;
}
