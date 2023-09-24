import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { StateEnum } from '../enums/state.enum';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'enum', enum: StateEnum, default: StateEnum.ACTIVE })
  state: StateEnum;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
