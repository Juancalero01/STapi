import { ProductEntity } from 'src/modules/product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('product_types')
export class ProductTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  prefix: string;

  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[];
}
