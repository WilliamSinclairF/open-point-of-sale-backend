import { Store } from './Store';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
  getConnection,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sale } from './Sale';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modifiedAt: Date;

  @Column()
  uid: string;

  @ManyToMany(() => Store, (store) => store.users)
  @JoinTable()
  stores: Store[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  async getStores() {
    const connection = getConnection();
    const stores = await connection
      .getRepository(Store)
      .createQueryBuilder('store')
      .leftJoin('store.users', 'user')
      .where('user.id = :id', { id: this.id })
      .getMany();
    return stores;
  }

  async newSale(storeId: number, saleOptions: Sale) {
    const connection = getConnection();
    const newSale = new Sale();
    const store = await Store.findOneOrFail(storeId);
    newSale.user = this;
    newSale.store = store;
    newSale.amount = saleOptions.amount;
    newSale.note = saleOptions.note;
    try {
      await connection.manager.save(newSale);
      await connection.manager.save(store);
      return newSale;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
