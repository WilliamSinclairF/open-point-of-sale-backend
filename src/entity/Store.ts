import { Sale } from './Sale';
import { StoreSettings } from './StoreSettings';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @ManyToMany(() => User, (user) => user.stores)
  users: User[];

  @OneToMany(() => Sale, (sale) => sale.store, { cascade: true })
  sales: Sale[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @OneToOne(() => StoreSettings, { cascade: true })
  @JoinColumn()
  storeSettings: StoreSettings;

  getSales() {
    return this.sales;
  }
}
