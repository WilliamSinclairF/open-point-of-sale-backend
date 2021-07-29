import { Request, Response } from 'express';
import { Store } from 'src/interfaces/store';

const stores: Store[] = [
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

export function getAllStores(_req: Request, res: Response) {
  return res.status(200).json(stores);
}

export function addStore(req: Request, res: Response) {
  const id = stores.length + 1;
  stores.push({ id, ...req.body });

  return res.status(200).json({ ok: true, stores });
}
