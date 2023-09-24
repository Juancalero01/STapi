import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tax_conditions')
export class TaxConditionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  name: string;
}
