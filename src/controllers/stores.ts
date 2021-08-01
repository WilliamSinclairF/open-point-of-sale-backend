import { User } from './../entity/User';
import { Request, Response } from 'express';
import { Store } from '../entity/Store';
import { getRepository, getConnection } from 'typeorm';

export async function getAllStores(req: Request, res: Response) {
  const userId = req.currentUser.uid;

  const user = await User.findOne({ uid: userId });

  if (!user) {
    return res.status(404).json({ ok: false, data: 'User not found' });
  }

  const stores = await user.getStores();

  return res.json(stores);
}

export async function getStoreSales(req: Request, res: Response) {
  const storeId = +req.params.storeId;
  console.log(storeId);

  if (typeof storeId !== 'number') {
    return res.status(400).json({ ok: false, data: 'Invalid store ID' });
  }

  try {
    const result = await getRepository(Store)
      .createQueryBuilder('store')
      .leftJoin('store.users', 'user')
      .leftJoinAndSelect('store.sales', 'sale')
      .leftJoinAndSelect('sale.user', 'saleUser')
      .where('user.id = :id', { id: req.currentUser.id })
      .andWhere('store.id = :storeId', { storeId })
      .getOneOrFail();

    return res.json({ ok: true, data: result });
  } catch (error) {
    return res.status(404).json({ ok: false, data: 'Could not get sales for specified store' });
  }
}

export async function addStore(req: Request, res: Response) {
  const { name, description, address, storeSettings } = req.body;

  const user = await User.findOne(req.currentUser.id);

  if (!user) {
    return res.status(404).json({ ok: false, data: 'Invalid user' });
  }

  try {
    const store = new Store();
    store.name = name;
    store.description = description;
    store.address = address;
    store.storeSettings = storeSettings;
    await store.save();

    getConnection().createQueryBuilder().relation(User, 'stores').of(user).add(store);

    return res.status(200).json({ ok: true, store });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, data: 'Unable to create store' });
  }
}

export async function createStoreSettings(_req: Request, _res: Response) {}
