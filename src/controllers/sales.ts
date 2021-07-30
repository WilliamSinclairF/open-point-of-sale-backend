import { Request, Response } from 'express';
import { User } from '../entity/User';

const sales = [{ id: 1, amount: 50.5, note: 'hello' }];

export function getAllSales(_req: Request, res: Response) {
  return res.status(200).json(sales);
}

export async function addSale(req: Request, res: Response) {
  const userId = req.currentUser.uid;
  const storeId = req.body.storeId;
  if (!storeId) {
    return res.status(400).json({ ok: false, data: 'Store ID missing in request body' });
  }

  const user = await User.findOne({ uid: userId });

  const stores = await user?.getStores();

  const [requestedStore] = (stores || []).filter((store) => +store.id === +storeId);

  console.log(requestedStore);

  if (!requestedStore) {
    return res.status(404).json({ ok: false, data: 'Store not found' });
  }

  const newSale = await user?.newSale(requestedStore.id, req.body);

  if (!newSale) {
    return res.status(500).json({ ok: false, data: 'Unable to create new sale' });
  }

  return res.status(200).json({ ok: true, sale: newSale });
}
