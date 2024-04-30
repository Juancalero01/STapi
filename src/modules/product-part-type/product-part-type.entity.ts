import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductPartEntity } from '../product-part/product-part.entity';

@Entity('product_part_types')
export class ProductPartTypeEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 120, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  prefix: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @OneToMany(
    () => ProductPartEntity,
    (productPart) => productPart.productPartType,
  )
  productPart: ProductPartEntity;
}
