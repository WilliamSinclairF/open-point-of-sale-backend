import { Request, Response } from 'express';

const sales = [{ id: 1, amount: 50.5, note: 'hello' }];

export function getAllSales(_req: Request, res: Response) {
  return res.status(200).json(sales);
}

export function addSale(req: Request, res: Response) {
  const id = sales.length + 1;
  sales.push({ id, ...req.body });

  return res.status(200).json({ ok: true, sales });
}
