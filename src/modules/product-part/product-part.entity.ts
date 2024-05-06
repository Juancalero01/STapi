import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { ProductPartTypeEntity } from '../product-part-type/product-part-type.entity';
import { ProductPartHistoryEntity } from '../product-part-history/product-part-history.entity';

@Entity('product_parts')
export class ProductPartEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  serial: string;

  @ManyToOne(() => ProductEntity, (product) => product.productPart, {
    cascade: true,
  })
  product: ProductEntity;

  @ManyToOne(
    () => ProductPartTypeEntity,
    (productPartType) => productPartType.productPart,
    {
      eager: true,
      cascade: true,
    },
  )
  productPartType: ProductPartTypeEntity;

  @OneToMany(
    () => ProductPartHistoryEntity,
    (productPartHistory) => productPartHistory.productPart,
    {
      eager: true,
    },
  )
  productPartHistory: ProductPartHistoryEntity[];
}
