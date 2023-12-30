import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { ProvinceEntity } from 'src/modules/province/province.entity';
import { TaxConditionEntity } from 'src/modules/tax-condition/tax-condition.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  taxpayerName: string;

  @Column({
    type: 'varchar',
    length: 13,
    nullable: true,
  })
  taxpayerId: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  taxpayerEmail: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  taxpayerPhone: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  number: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  floor: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  office: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  postalCode: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  contactName: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  contactEmail: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  contactPhone: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  comment: string;

  @ManyToOne(() => TaxConditionEntity, (taxCondition) => taxCondition.clients, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  taxCondition: TaxConditionEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.clients, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  province: ProvinceEntity;

  @OneToMany(() => ProductEntity, (product) => product.client)
  products: ProductEntity[];
}
