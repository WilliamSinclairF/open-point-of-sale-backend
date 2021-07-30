import { User } from './../entity/User';
import { Request, Response } from 'express';
import { IStore } from 'src/interfaces/store';

const stores: IStore[] = [
  {
    id: 'dfshdfksdhfsdklf1',
    name: 'My Store',
    description: 'A cool store',
    address: '123 Foobar St.',
    createdAt: new Date(),
    modifiedAt: new Date(),
    storeSettings: {
      taxCode: 'QC',
      open: true,
    },
  },
  {
    id: 'bob-bob-dfshdfksdhfsdklf1',
    name: 'My Other Store',
    description: 'A cooler store',
    address: '54321 McFoobar St.',
    createdAt: new Date(),
    modifiedAt: new Date(),
    storeSettings: {
      taxCode: 'QC',
      open: true,
    },
  },
];

export async function getAllStores(req: Request, res: Response) {
  const userId = req.currentUser.uid;

  const user = await User.findOne({ uid: userId });

  if (!user) {
    return res.status(404).json({ ok: false, data: 'User not found' });
  }

  const stores = await user.getStores();

  return res.json(stores);
}

export function addStore(req: Request, res: Response) {
  const id = stores.length + 1;
  stores.push({ id, ...req.body });

  return res.status(200).json({ ok: true, stores });
}
