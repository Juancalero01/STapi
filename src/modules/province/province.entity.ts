import { ClientEntity } from 'src/modules/client/entity/client.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('provinces')
export class ProvinceEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  name: string;

  @OneToMany(() => ClientEntity, (client) => client.province)
  clients: ClientEntity[];
}
