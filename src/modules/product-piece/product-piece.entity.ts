import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity('product_pieces')
export class ProductPieceEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  hardwareId: string;

  @ManyToOne(() => ProductEntity, (product) => product.productPieces)
  product: ProductEntity;
}
