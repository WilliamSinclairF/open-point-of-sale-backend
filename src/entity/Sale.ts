import { Item } from './Item';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Store } from './Store';
import { User } from './User';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];

  @ManyToOne(() => Store, (store) => store.sales)
  store: Store;

  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @Column()
  amount: number;

  @Column({ nullable: true })
  note: string;
}
