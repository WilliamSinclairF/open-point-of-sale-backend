import { StoreSettings } from './StoreSettings';
import { TaxRate } from './TaxRate';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { Item } from './Item';

@Entity()
export class TaxCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @Column()
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => TaxRate, (taxRate) => taxRate.taxCode, { eager: true })
  taxRates: TaxRate[];

  @OneToMany(() => Item, (item) => item.taxCode)
  items: Item[];

  @ManyToOne(() => StoreSettings, (storeSettings) => storeSettings.taxCodes)
  storeSettings: StoreSettings;
}
