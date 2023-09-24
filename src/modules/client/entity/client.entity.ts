import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 120, unique: true, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
    nullable: true,
    default: null,
  })
  cuit: string;

  @Column({ type: 'varchar', length: 120, nullable: true, default: null })
  contact: string;

  @Column({
    type: 'varchar',
    length: 120,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string;

  @Column({
    type: 'char',
    length: 20,
    unique: true,
    nullable: true,
    default: null,
  })
  phone: string;

  @OneToMany(() => ProductEntity, (product) => product.client)
  products: ProductEntity[];
}
