import { ClientEntity } from 'src/modules/client/entity/client.entity';
import { ProductTypeEntity } from 'src/modules/product-type/entity/product-type.entity';
import { ServiceEntity } from 'src/modules/service/service.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
  serial: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  reference: string;

  @Column({ type: 'datetime', nullable: false })
  deliveryDate: Date;

  @ManyToOne(() => ProductTypeEntity, (productType) => productType.products)
  productType: ProductTypeEntity;

  @ManyToOne(() => ClientEntity, (client) => client.products)
  client: ClientEntity;

  @OneToMany(() => ServiceEntity, (service) => service.product)
  service: ServiceEntity[];
}
