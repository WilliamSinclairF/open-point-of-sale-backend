import { TaxCode } from './TaxCode';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @ManyToOne(() => TaxCode, (taxCode) => taxCode.items)
  taxCode: TaxCode;

  @Column()
  name: string;

  @Column()
  description: string;
}
