import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('failure_types')
export class FailureTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;
}
