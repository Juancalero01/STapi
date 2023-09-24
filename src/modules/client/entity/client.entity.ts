import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ProvinceEntity } from 'src/shared/modules/province/province.entity';
import { TaxConditionEntity } from 'src/shared/modules/tax-condition/tax-condition.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  taxpayerName: string;

  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
    nullable: true,
    default: null,
  })
  taxpayerId: string;

  @ManyToOne(() => TaxConditionEntity, (taxCondition) => taxCondition.clients, {
    nullable: true,
    cascade: true,
  })
  taxCondition: TaxConditionEntity;

  @Column({
    type: 'varchar',
    length: 120,
    unique: true,
    nullable: true,
    default: null,
  })
  taxpayerEmail: string;

  @Column({
    type: 'char',
    length: 20,
    unique: true,
    nullable: true,
    default: null,
  })
  taxpayerPhone: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.clients, {
    nullable: true,
    cascade: true,
  })
  province: ProvinceEntity;

  @Column({ type: 'varchar', length: 150, nullable: true, default: null })
  street: string;

  @Column({ type: 'varchar', length: 120, nullable: true, default: null })
  number: string;

  @Column({ type: 'varchar', length: 120, nullable: true, default: null })
  floor: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  office: string;

  @Column({ type: 'varchar', length: 8, nullable: true, default: null })
  postalCode: string;

  @Column({ type: 'varchar', length: 120, nullable: true, default: null })
  contactName: string;

  @Column({
    type: 'varchar',
    length: 120,
    unique: true,
    nullable: true,
    default: null,
  })
  contactEmail: string;

  @Column({
    type: 'char',
    length: 20,
    unique: true,
    nullable: true,
    default: null,
  })
  contactPhone: string;

  @Column({ type: 'varchar', length: 250, nullable: true, default: null })
  comment: string;

  @OneToMany(() => ProductEntity, (product) => product.client)
  products: ProductEntity[];
}
