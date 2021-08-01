import { TaxCode } from './TaxCode';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TaxRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TaxCode, (taxCode) => taxCode.taxRates)
  taxCode: TaxCode;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @Column()
  name: string;

  @Column('decimal')
  percentage: number;
}
