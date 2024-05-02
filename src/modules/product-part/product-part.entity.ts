import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { ProductPartTypeEntity } from '../product-part-type/product-part-type.entity';

@Entity('product_parts')
export class ProductPartEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  serial: string;

  @ManyToOne(() => ProductEntity, (product) => product.productPart)
  product: ProductEntity;

  @ManyToOne(
    () => ProductPartTypeEntity,
    (productPartType) => productPartType.productPart,
    {
      eager: true,
    },
  )
  productPartType: ProductPartTypeEntity;
}
