import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('product_types')
export class ProductTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 4, unique: true, nullable: true })
  prefix: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[];
}
