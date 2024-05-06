import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductPartEntity } from '../product-part/product-part.entity';
import { UserEntity } from '../user/user.entity';

@Entity('product_part_histories')
export class ProductPartHistoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 15, nullable: false })
  currentSerial: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  newSerial: string;

  @ManyToOne(
    () => ProductPartEntity,
    (productPart) => productPart.productPartHistory,
  )
  productPart: ProductPartEntity;

  @ManyToOne(() => UserEntity, (user) => user.serviceHistory, {
    eager: true,
    nullable: false,
  })
  user: UserEntity;

  @Column({ type: 'datetime', nullable: true })
  dateEntry: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  remarks: string;
}
